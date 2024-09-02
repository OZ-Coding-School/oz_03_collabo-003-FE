import { baseInstance } from '../utils/instance';

export const reviewContentAPI = {
  getLike: async () => {
    const { data } = await baseInstance.get('/contents/liked-content/');
    return data;
  },

  updateLike: async () => {
    const { data } = await baseInstance.post('/contents/like/');
    return data;
  },
};
