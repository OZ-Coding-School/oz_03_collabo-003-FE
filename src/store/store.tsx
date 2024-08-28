import { create } from 'zustand';
import { AnalysisRequestSiteState } from '../types/type';

export const useAnalysisRequestSite = create<AnalysisRequestSiteState>((set) => ({
  contentId: null,
  setContent: (id: number | null) => set({ contentId: id }), // 타입 명시 추가
  clearContent: () => set({ contentId: null }),
}));

// 상태를 관리하기 위한 AuthState 인터페이스 정의
interface AuthState {
  isLoggedIn: boolean; // 로그인 상태
  userId: number | null; // 사용자 ID
  nickname: string | null; // 닉네임
  email: string | null; // 이메일
  logIn: (userId: number, nickname: string, email: string) => void; // 로그인 함수
  logOut: () => void; // 로그아웃 함수
}

// zustand 스토어 생성
export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false, // 기본 로그인 상태는 false로 설정
  userId: null, // 초기 사용자 ID 값 null
  nickname: null, // 초기 닉네임 값 null
  email: null, // 초기 이메일 값 null

  // 로그인 성공 시 실행될 함수 (쿠키 기반이므로 토큰은 저장하지 않음)
  logIn: (userId, nickname, email) =>
    set(() => ({
      isLoggedIn: true,
      userId, // 상태에 userId 저장
      nickname, // 상태에 nickname 저장
      email, // 상태에 email 저장
    })),

  // 로그아웃 시 실행될 함수
  logOut: () =>
    set(() => ({
      isLoggedIn: false,
      userId: null,
      nickname: null,
      email: null,
    })),
}));
