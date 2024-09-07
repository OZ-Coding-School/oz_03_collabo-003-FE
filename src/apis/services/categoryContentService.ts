import { contentAPI } from '../api/content';
import { categoriesAPI } from '../api/categories';
import { Content } from '../../types/type';

// export interface Content {
//   id: number;
//   title: string;
//   site_url: string;
//   thumbnail: string;
//   site_description: string;
//   main_category: string;
//   semi_category?: string;
//   main_category_id: number;
//   semi_category_id?: number;
//   detailedInfo?: string;
//   review?: {
//     id: number;
//     user_id: number;
//     user_name?: string;
//     comment: string;
//     rating: number;
//   };
//   qna?: QnA;
//   viewCount?: number;
//   likeCount?: number;
//   is_analyzed?: boolean;
//   rating?: number;
//   ratingParticipation?: number;
//   isBookmarked?: boolean;
// }

interface MainCategoryContent {
  contentId: number;
  title: string;
  mainCategoryId: number;
  mainCategoryName: string;
  thumbnail: string;
  siteDescription: string;
}

interface SemiCategoryContent {
  contentId: number;
  title: string;
  mainCategoryId: number;
  semiCategoryId: number;
  mainCategorySlug: string;
  semiCategorySlug: string;
  mainCategoryName: string;
  semiCategoryName: string;
  thumbnail: string;
  siteDescription: string;
}

export const categoryContentService = {
  getMainCategoryContents: async (): Promise<MainCategoryContent[]> => {
    try {
      const allContents = await contentAPI.getAllContents();
      const categories = await categoriesAPI.getAllCategories();

      return allContents.map((content) => {
        const matchedCategoryId = categories.find((category) => category.id === content.main_category_id);

        return {
          contentId: content.id,
          title: content.title,
          mainCategoryId: content.main_category_id,
          mainCategoryName: content.main_category,
          thumbnail: content.thumbnail,
          siteDescription: content.site_description,
          mainSlug: matchedCategoryId ? matchedCategoryId.slug : '',
        };
      });
    } catch (error) {
      console.error('메인 카테고리 콘텐츠 가져오기 오류:', error);
      throw error;
    }
  },

  getSemiCategoryContents: async (): Promise<SemiCategoryContent[]> => {
    try {
      const allContents = await contentAPI.getAllContents();
      const categories = await categoriesAPI.getAllCategories();

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
          if (content.semi_category_id === undefined) {
            return null;
          }

          const semiCategory = semiCategoryMap.get(content.semi_category_id);

          if (!semiCategory) {
            return null;
          }

          const mainCategory = mainCategoryMap.get(semiCategory.parentId);

          return {
            contentId: content.id,
            mainCategoryId: content.main_category_id,
            semiCategoryId: content.semi_category_id,
            mainCategorySlug: mainCategory?.slug || '',
            semiCategorySlug: semiCategory.slug,
            mainCategoryName: mainCategory?.name || '',
            semiCategoryName: semiCategory.name,
            thumbnail: content.thumbnail,
            title: content.title,
            siteDescription: content.site_description,
          };
        })
        .filter((item) => item !== null) as SemiCategoryContent[];
    } catch (error) {
      console.error('세미 카테고리 콘텐츠 가져오기 오류:', error);
      throw error;
    }
  },
};
