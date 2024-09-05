//import { Content } from '../../types/type';
//import { baseInstance } from '../utils/instance';

// export const contentAPI = {
//   getAllContents: async (): Promise<Content[]> => {
//     const { data } = await baseInstance.get('/contents/upload-content/',{
//       withCredentials: true,
//     });
//     return data;
//   },

//   createContent: async (): Promise<Content[]> => {
//     const { data } = await baseInstance.post('/contents/upload-content/',{
//       withCredentials: true,
//     });
//     return data;
//   },

//   updateContent: async (contentId: string): Promise<Content[]> => {
//     const { data } = await baseInstance.patch(`/contents/update-content/${contentId}/`,{
//       withCredentials: true,
//     });
//     return data;
//   },

//   deleteContent: async (contentId: string): Promise<Content[]> => {
//     const { data } = await baseInstance.delete(`/contents/delete-content/${contentId}/`,{
//       withCredentials: true,
//     });
//     return data;
//   },
// };

// 테스트용
import contents from '../../data/contents.json';

export const contentAPI = {
  getAllContents: async () => {
    return contents;
  },
};
