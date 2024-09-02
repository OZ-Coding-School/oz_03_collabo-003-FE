import { contentAPI } from '../api/content';
import { categoryService } from '../services/categoryService';

interface Content {
  id: number;
  title: string;
  thumbnail: string;
  site_description: string;
  mainCategory_id: number;
  semiCategory_id: number;
}

interface MainCategoryMappedContent {
  contentId: number;
  mainCategoryId: number;
  mainCategorySlug: string | undefined;
  thumbnail: string;
  title: string;
  siteDescription: string;
}

interface SemiCategoryMappedContent {
  contentId: number;
  mainCategoryId: number;
  semiCategoryId: number;
  mainCategorySlug: string | undefined;
  semiCategorySlug: string | undefined;
  thumbnail: string;
  title: string;
  siteDescription: string;
}

export const categoryContentService = {
  getMainCategoryContents: async (mainCategoryId: number): Promise<MainCategoryMappedContent[]> => {
    try {
      const allContents = await contentAPI.getAllContents();
      const categories = await categoryService.getCategories();

      const mainCategoryMap = new Map(categories.map((cat) => [cat.id, cat.slug]));

      const filteredContents = allContents.filter((content: Content) => content.mainCategory_id === mainCategoryId);

      return filteredContents.map((content: Content) => ({
        contentId: content.id,
        mainCategoryId: content.mainCategory_id,
        mainCategorySlug: mainCategoryMap.get(content.mainCategory_id),
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

      const mainCategoryMap = new Map(categories.map((cat) => [cat.id, cat.slug]));
      const semiCategoryMap = new Map(
        categories.flatMap((cat) =>
          cat.semiCategories.map((semiCat) => [semiCat.id, { slug: semiCat.slug, parentId: cat.id }])
        )
      );

      return allContents
        .map((content: Content) => {
          const semiCategory = semiCategoryMap.get(content.semiCategory_id);

          if (!semiCategory) {
            return null;
          }

          return {
            contentId: content.id,
            mainCategoryId: content.mainCategory_id,
            semiCategoryId: content.semiCategory_id,
            mainCategorySlug: mainCategoryMap.get(semiCategory.parentId),
            semiCategorySlug: semiCategory.slug,
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
