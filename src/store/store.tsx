import { create } from 'zustand';
import { AnalysisRequestSiteState } from '../types/type';

export const useAnalysisRequestSite = create<AnalysisRequestSiteState>((set) => ({
  contentId: null,
  setContent: (id: number | null) => set({ contentId: id }), // 타입 명시 추가
  clearContent: () => set({ contentId: null }),
}));

// 상태를 관리하기 위한 AuthState 인터페이스 정의
interface AuthState {
  isLoggedIn: boolean;
  setLoggedIn: (loggedIn: boolean) => void;
  logOut: () => void;
}

// zustand 스토어 생성
export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false, // 기본 로그인 상태는 false로 설정
  setLoggedIn: (loggedIn: boolean) => set(() => ({ isLoggedIn: loggedIn })), // 로그인 상태 변경
  logOut: () => set(() => ({ isLoggedIn: false })), // 로그아웃 시 로그인 상태를 false로 설정
}));
