// import { baseInstance } from '../utils/instance';

// export const contentAPI = {
//   getAllContents: async () => {
//     const { data } = await baseInstance.get('/contents/upload-contents/');
//     return data;
//   },

//   createContent: async () => {
//     const { data } = await baseInstance.post('/potatoes/collection/');
//     return data;
//   },

//   updateContent: async (contentId: string) => {
//     const { data } = await baseInstance.patch(`/stacks/delete/${contentId}/`);
//     return data;
//   },

//   deleteContent: async (contentId: string) => {
//     const { data } = await baseInstance.delete(`/stacks/delete/${contentId}/`);
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
