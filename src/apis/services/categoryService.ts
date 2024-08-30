import { categoriesAPI } from '../api/categories';
import { Category } from '../../types/type';

export const categoryService = {
  getCategories: async (): Promise<Category[]> => {
    try {
      const data = await categoriesAPI.getAllCategories();

      const refinedCategories = data.map((category: any) => ({
        id: category.id,
        categories: category.categories,
        slug: category.slug,
        semiCategories: category.semiCategories.map((semiCategory: any) => ({
          id: semiCategory.id,
          label: semiCategory.label,
          slug: semiCategory.slug,
        })),
      }));

      return refinedCategories;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  getCategoryBySlug: async (slug: string): Promise<Category | undefined> => {
    try {
      const categories = await categoryService.getCategories();

      return categories.find((category) => category.slug === slug);
    } catch (error) {
      console.error(`Error fetching category with slug ${slug}:`, error);
      throw error;
    }
  },
};
