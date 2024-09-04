import { contentAPI } from '../api/content';
import { categoryService } from '../services/categoryService';

interface Content {
  id: number;
  title: string;
  thumbnail: string;
  site_description: string | null;
  main_category: number;
  semi_category: number;
}

interface MainCategoryMappedContent {
  contentId: number;
  main_category: number;
  mainCategorySlug: string | undefined;
  mainCategoryName: string | undefined;
  thumbnail: string;
  title: string;
  siteDescription: string | null;
}

interface SemiCategoryMappedContent {
  contentId: number;
  main_category: number;
  semi_category: number;
  mainCategorySlug: string | undefined;
  semiCategorySlug: string | undefined;
  mainCategoryName: string | undefined;
  semiCategoryName: string | undefined;
  thumbnail: string;
  title: string;
  siteDescription: string | null;
}

export const categoryContentService = {
  getMainCategoryContents: async (main_category: number): Promise<MainCategoryMappedContent[]> => {
    try {
      const allContents = await contentAPI.getAllContents();
      const categories = await categoryService.getCategories();

      const mainCategoryMap = new Map(categories.map((cat) => [cat.id, { slug: cat.slug, name: cat.categories }]));

      const filteredContents = allContents.filter((content: Content) => content.main_category === main_category);

      return filteredContents.map((content: Content) => ({
        contentId: content.id,
        main_category: content.main_category,
        mainCategorySlug: mainCategoryMap.get(content.main_category)?.slug,
        mainCategoryName: mainCategoryMap.get(content.main_category)?.name,
        thumbnail: content.thumbnail,
        title: content.title,
        siteDescription: content.site_description,
      }));
    } catch (error) {
      console.error('메인 카테고리 콘텐츠 가져오기 오류:', error);
      throw error;
    }
  },

  getSemiCategoryContents: async (): Promise<SemiCategoryMappedContent[]> => {
    try {
      const allContents = await contentAPI.getAllContents();
      const categories = await categoryService.getCategories();

      const mainCategoryMap = new Map(categories.map((cat) => [cat.id, { slug: cat.slug, name: cat.categories }]));
      const semiCategoryMap = new Map(
        categories.flatMap((cat) =>
          cat.semiCategories.map((semiCat) => [
            semiCat.id,
            { slug: semiCat.slug, name: semiCat.label, parentId: cat.id },
          ])
        )
      );

      return allContents
        .map((content: Content) => {
          const semiCategory = semiCategoryMap.get(content.semi_category);

          if (!semiCategory) {
            return null;
          }

          return {
            contentId: content.id,
            main_category: content.main_category,
            semi_category: content.semi_category,
            mainCategorySlug: mainCategoryMap.get(semiCategory.parentId)?.slug,
            semiCategorySlug: semiCategory.slug,
            mainCategoryName: mainCategoryMap.get(semiCategory.parentId)?.name,
            semiCategoryName: semiCategory.name,
            thumbnail: content.thumbnail,
            title: content.title,
            siteDescription: content.site_description,
          };
        })
        .filter((item) => item !== null) as SemiCategoryMappedContent[];
    } catch (error) {
      console.error('세미 카테고리 콘텐츠 가져오기 오류:', error);
      throw error;
    }
  },
};
