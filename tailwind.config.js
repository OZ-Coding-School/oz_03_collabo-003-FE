/** @type {import('tailwindcss').Config} */

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      screens: {
        'sm-md': { min: '641px', max: '767px' },
        '2xl': '1450px',
      },
    },
    colors: {
      white: {
        DEFAULT: '#fff',
        f9: '#F9F9F9', // Home-background, 상세-text box background
      },
      blue: {
        dark: '#1C3D5A', // 텍스트나 배경
        primary: '#4169E1', // 기본 색상, 버튼, 주요 UI 요소
        accent: '#5A9BD4', // 강조 요소나 하이라이트
        hover: '#274B8F', // primary 색상의 호버 상태
      },
      black: {
        DEFAULT: '#333333', // 기본 텍스트
        b2: '#2b2b2b', // 더 어두운 블랙, 강조 텍스트
      },
      gray: {
        dc: '#DCDCDC', // 분리선 또는 비활성화 요소
        c4: '#c4c4c4', // 푸터, 입력란의 플레이스홀더, 인풋 기본 테두리
        db: '#BDBDBD', // 버튼 비활성화 시 사용, 비활성화 상태 표현
        75: '#757575', // 설명글, 중간 테두리, 비활성화 텍스트
        46: '#464646', // 깊이감 있는 회색, 강조 텍스트 또는 강한 경계선
      },
      yellow: '#FEE500', // 카카오 관련 요소
      orange: '#FFB800', // 주의 알림, 경고 메시지
      red: '#E4381E', // 경고/위험 알림, 취소 버튼
    },
    boxShadow: {
      'custom-light': '0px 0px 4px 0px rgba(0, 0, 0, 0.10)', //아이콘-연한 그림자
      'custom-dark': '0px 0px 4px 0px rgba(0, 0, 0, 0.30)', //버튼-진한 그림자
      'custom-down': '0px 4px 4px 0px rgba(0, 0, 0, 0.20)', // 아래쪽에만 그림자
    },
    keyframes: {
      slideDown: {
        '0%': { transform: 'translateY(-10px)', opacity: '0' },
        '100%': { transform: 'translateY(0)', opacity: '1' },
      },
      pulse: {
        '0%': { opacity: '1' },
        '50%': { opacity: '.5' },
        '100%': { opacity: '1' },
      },
    },
    animation: {
      slideDown: 'slideDown 0.3s ease-out forwards',
      pulse: 'pulse 2s infinite',
    },
  },
  plugins: [],
};
