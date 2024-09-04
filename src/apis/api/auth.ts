import { User } from '../../types/type';
import { baseInstance } from '../utils/instance';

interface LoginCredentials {
  username: string;
  password: string;
}

interface RoleData {
  role: string;
}

interface ResetData {
  token: string;
  newPassword: string;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

interface CodeData {
  code: string;
  email: string;
}

export const auth = {
  // 계정 삭제
  deleteAccount: async (): Promise<any> => {
    const { data } = await baseInstance.delete('/accounts/account-delete/');
    return data;
  },

  // 사용자 이름 확인
  checkUsername: async (username: string): Promise<any> => {
    const { data } = await baseInstance.post('/accounts/check-username/', { username });
    return data;
  },

  // 로그인
  login: async (credentials: LoginCredentials): Promise<any> => {
    const { data } = await baseInstance.post('/accounts/login/', credentials);
    return data;
  },

  // 역할 설정
  setRole: async (roleData: RoleData): Promise<any> => {
    const { data } = await baseInstance.post('/accounts/me/role/', roleData);
    return data;
  },

  // 비밀번호 재설정
  resetPassword: async (email: string): Promise<any> => {
    const { data } = await baseInstance.post('/accounts/password-reset/', { email });
    return data;
  },

  // 비밀번호 재설정 확인
  confirmResetPassword: async (resetData: ResetData): Promise<any> => {
    const { data } = await baseInstance.post('/accounts/password-reset/confirm/', resetData);
    return data;
  },

  // 프로필 조회
  getProfile: async (): Promise<User> => {
    const { data } = await baseInstance.get('/accounts/profile/');
    return data;
  },

  // 회원가입
  register: async (registerData: RegisterData): Promise<any> => {
    const { data } = await baseInstance.post('/accounts/register/', registerData);
    return data;
  },

  // 인증 코드 발송
  sendVerificationCode: async (email: string): Promise<any> => {
    const { data } = await baseInstance.post('/accounts/send-verification-code/', { email });
    return data;
  },

  // 인증 코드 확인
  verifyCode: async (codeData: CodeData): Promise<any> => {
    const { data } = await baseInstance.post('/accounts/verify-code/', codeData);
    return data;
  },
};
