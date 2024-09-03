import { baseInstance } from '../utils/instance';

export const authSocial = {
  // 구글 로그인
  googleLogin: async (): Promise<any> => {
    const { data } = await baseInstance.get('/accounts/google/login/');
    return data;
  },

  // 카카오 로그인
  kakaoLogin: async (): Promise<any> => {
    const { data } = await baseInstance.get('/accounts/kakao/login/');
    return data;
  },

  // 네이버 로그인
  naverLogin: async (): Promise<any> => {
    const { data } = await baseInstance.get('/accounts/naver/login/');
    return data;
  },
};
