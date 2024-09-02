import { baseInstance } from '../utils/instance';

export const request = {
  // 분석 요청 목록 조회
  getAllRequest: async () => {
    const { data } = await baseInstance.get('/request/');
    return data;
  },

  // 분석 리퀘 승낙
  acceptRequest: async (requestId: string) => {
    const { data } = await baseInstance.post(`/request/accept/${requestId}/`);
    return data;
  },

  // 조회된 분석가 목록
  getAcceptedRequest: async (requestId: string) => {
    const { data } = await baseInstance.get(`/request/accepted/${requestId}/`);
    return data;
  },

  // 분석가가 수락한 분석 요청 목록 조회
  getAnalystRequests: async () => {
    const { data } = await baseInstance.get('/request/analyst');
    return data;
  },

  // 클라이언트 별 분석 요청 조회
  getClientRequests: async () => {
    const { data } = await baseInstance.get('/request/client');
    return data;
  },

  // 분석 보고서 업로드
  uploadReport: async (reportData: object) => {
    const { data } = await baseInstance.post('/request/report', reportData);
    return data;
  },

  // 분석 보고서 조회
  getReportById: async (reportId: string) => {
    const { data } = await baseInstance.get(`/request/report/${reportId}`);
    return data;
  },

  // 분석가 선택 및 매칭
  selectAnalyst: async (requestId: string) => {
    const { data } = await baseInstance.post(`/request/select/${requestId}`);
    return data;
  },

  // 특정 분석 요청 조회
  getRequestById: async (requestId: string) => {
    const { data } = await baseInstance.get(`/request/${requestId}`);
    return data;
  },
};
