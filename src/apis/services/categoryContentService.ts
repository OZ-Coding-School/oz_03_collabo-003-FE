import { contentAPI } from '../api/content';
import { categoryService } from '../services/categoryService';

interface Content {
  id: number;
  title: string;
  site_url: string;
  thumbnail: string;
  site_description: string;
  category: string;
}

interface MainCategoryMappedContent {
  contentId: number;
  mainCategorySlug: string | undefined;
  thumbnail: string;
  title: string;
  siteDescription: string;
}

interface SemiCategoryMappedContent {
  contentId: number;
  mainCategorySlug: string | undefined;
  semiCategorySlug: string | undefined;
  thumbnail: string;
  title: string;
  siteDescription: string;
}

export const categoryContentService = {
  getMainCategoryContents: async (mainCategoryId: number): Promise<MainCategoryMappedContent[]> => {
    try {
      const allStackData = await contentAPI.getAllContents();
      const categories = await categoryService.getCategories();

      const mainCategoryMap = new Map(categories.map((cat) => [cat.id, cat.slug]));

      const filteredContents = allStackData.filter(
        (content: Content) => content.category === mainCategoryId.toString()
      );

      return filteredContents.map((content: Content) => ({
        contentId: content.id,
        mainCategorySlug: mainCategoryMap.get(Number(content.category)),
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
      const allStackData = await contentAPI.getAllContents();
      const categories = await categoryService.getCategories();

      const mainCategoryMap = new Map(categories.map((cat) => [cat.id, cat.slug]));

      return allStackData
        .map((content: Content) => {
          // categories 배열에서 특정 semiCategory를 찾습니다.
          const semiCategory = categories
            .flatMap((cat) => cat.semiCategories)
            .find((semiCat) => semiCat.id.toString() === content.category);

          if (!semiCategory) {
            return null;
          }

          // 메인 카테고리의 슬러그를 얻기 위해 semiCategory의 parent를 찾습니다.
          const parentCategory = categories.find((cat) =>
            cat.semiCategories.some((semiCat) => semiCat.id === semiCategory.id)
          );

          return {
            contentId: content.id,
            mainCategorySlug: parentCategory ? mainCategoryMap.get(parentCategory.id) : undefined,
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
