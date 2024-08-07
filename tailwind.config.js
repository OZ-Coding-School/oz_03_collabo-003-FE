/** @type {import('tailwindcss').Config} */

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {},
    colors: {
      white: {
        DEFAULT: '#fff',
      },
      blue: {
        strong: '#191970',
        basic: '#4169E1', //기준색상/ 버튼색상
        Primary: '#408BFC', //버튼 Hover시
      },
      black: {
        DEFAULT: '#000', // 전체 text 색상
        33: '#333333',
      },
      gray: {
        f9: '#F9F9F9', // 전체 background 색상
        c4: '#c4c4c4', // 푸터, input-플레이스 홀더 등 연한 글씨 / 인풋 기본 테두리
        db: '#BDBDBD', // 버튼 비활성화 시 색상
        dc: '#DCDCDC', //
        fa: '#FAFAFA', //
      },
      orange: {
        alert: '#FFB800', // 경고/오류/에러/경고
      },
    },
    boxShadow: {
      'custom-light': '0px 0px 4px 0px rgba(0, 0, 0, 0.20)', //아이콘작은 그림자
    },
  },
  plugins: [],
};
