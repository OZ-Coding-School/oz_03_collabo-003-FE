import { contentAPI } from '../api/content';

interface Content {
  id: number;
  title: string;
  thumbnail: string;
  site_description: string;
  main_category: number;
  semi_category: number;
}

export const contentService = {
  getAllContents: async (): Promise<Content[]> => {
    try {
      const allStackData = await contentAPI.getAllContents();

      return allStackData.map((content: Content) => ({
        id: content.id,
        main_category: content.main_category,
        semi_category: content.semi_category,
        thumbnail: content.thumbnail,
        title: content.title,
        site_description: content.site_description,
      }));
    } catch (error: unknown) {
      console.error('Error fetching all contents:', error);
      throw error;
    }
  },
};
