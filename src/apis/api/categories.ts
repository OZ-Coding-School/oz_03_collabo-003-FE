// import { baseInstance } from '../utils/instance';

// export const categoriesAPI = {
//   //아직없음
//   getAllCategories: async () => {
//     const { data } = await baseInstance.get('/categories/');
//     return data;
//   },
// };

//테스트용
import categories from '../../data/categories.json';

export const categoriesAPI = {
  getAllCategories: async () => {
    return categories;
  },
};
