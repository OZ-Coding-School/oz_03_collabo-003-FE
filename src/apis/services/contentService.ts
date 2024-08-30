import { contentAPI } from '../api/content';

interface Content {
  content_id: string;
  main_category: string;
  semi_category: string;
  thumbnail: string;
  title: string;
  site_url: string;
  site_description: string;
  content: string;
  images: string[];
}

export const contentService = {
  getAllContents: async (): Promise<Content[]> => {
    try {
      const allStackData = await contentAPI.getAllContents();

      return allStackData.map((content: Content) => ({
        contentId: content.content_id,
        main_category: content.main_category,
        semi_category: content.semi_category,
        thumbnail: content.thumbnail,
        title: content.title,
        site_url: content.site_url,
        site_description: content.site_description,
        content: content.content,
        images: content.images,
      }));
    } catch (error: unknown) {
      console.error('Error fetching all contents:', error);
      throw error;
    }
  },
};
