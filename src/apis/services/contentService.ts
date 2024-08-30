import { contentAPI } from '../api/content';

interface Content {
  id: number;
  title: string;
  thumbnail: string;
  site_description: string;
  mainCategory_id: number;
  semiCategory_id: number;
}

export const contentService = {
  getAllContents: async (): Promise<Content[]> => {
    try {
      const allStackData = await contentAPI.getAllContents();

      return allStackData.map((content: Content) => ({
        id: content.id,
        mainCategory_id: content.mainCategory_id,
        semiCategory_id: content.semiCategory_id,
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
