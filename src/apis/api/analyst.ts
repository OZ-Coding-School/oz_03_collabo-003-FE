import { baseInstance } from '../utils/instance';

export const analystAPI = {
  // 전체 분석가 조회
  getAllAnalysts: async () => {
    const { data } = await baseInstance.get('/analysts/');
    return data;
  },

  // 새 분석가 생성
  addAnalystsRole: async () => {
    const { data } = await baseInstance.post('/analysts/');
    return data;
  },

  // 특정 분석가 조회
  getAnalyst: async (analystId: string) => {
    const { data } = await baseInstance.get(`/analysts/${analystId}/`);
    return data;
  },

  updateAnalyst: async (analystId: string) => {
    const { data } = await baseInstance.put(`/analysts/${analystId}/`);
    return data;
  },

  deleteAnalyst: async (analystId: string) => {
    const { data } = await baseInstance.delete(`/analysts/${analystId}/`);
    return data;
  },
};
