import { baseInstance } from '../utils/instance';

export const reviewContentAPI = {
  // get 리뷰 없음
  //   getReview: async () => {
  //     const { data } = await baseInstance.get('/contents/upload-contents/');
  //     return data;
  //   },

  createReview: async (reviewId: string) => {
    const { data } = await baseInstance.post(`/contents/add-review/${reviewId}/`);
    return data;
  },

  deleteReview: async (reviewId: string) => {
    const { data } = await baseInstance.delete(`/contents/delete-review/${reviewId}/`);
    return data;
  },
};
