<div align="left">
  <h1>AllThe</h1>
  <p>AllThe는 정보 플랫폼 거래 사이트입니다.
  <br/>의뢰자들은 자신의 웹사이트를 등록하여 이용자들이 볼 수 있게 하고, 웹사이트 분석 의뢰를 통해 전문가에게 분석을 요청할 수 있습니다.
  <br/>전문가(분석가)는 의뢰자들의 사이트를 분석하여 분석 결과물을 전달하며, 이를 통해 수익을 창출할 수 있습니다.
  <br/>이용자는 다양한 분야의 웹사이트를 한눈에 보고 편리하게 사용할 수 있는 기능을 제공합니다.
  <br/>
  <br/>이 플랫폼은 의뢰자, 분석가, 그리고 일반 이용자 모두에게 이익이 되는 구조로, 웹사이트 정보와 분석 결과를 기반으로 한 거래가 이루어집니다.</p>
</div>

<br/>

## 프로젝트 개요
- 프로젝트 이름: AllThe
- 프로젝트 기간: 2024년 08월 05일~2024년 09월 06일
- 배포URL: https://www.allthe.store/

<br/>

### 팀원 구성
| **강승혜** | **김예림** | **이민주** | **이희주** |
|:---------:|:---------:|:---------:|:---------:|
| <img src="https://avatars.githubusercontent.com/u/107114225?v=4" width="150"> | <img src="https://avatars.githubusercontent.com/u/162017639?v=4" width="150"> | <img src="https://avatars.githubusercontent.com/u/97680688?v=4" width="150"> | <img src="https://avatars.githubusercontent.com/u/164333745?v=4" width="150"> |
| [Watnu03](https://github.com/Watnu03) | [Yerim1234](https://github.com/Yerim1234) | [Yiminju](https://github.com/Yiminju) | [h22jul22](https://github.com/h22jul22) |

<br/>

***

## 1. 개발 환경
### 개발언어
<div>
  <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/>
</div>

### 라이브러리
<div>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
  <img src="https://img.shields.io/badge/Tailwind css-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">
</div>

### 상태관리
<div>
  <img src="https://img.shields.io/badge/zustand-FF6900?style=for-the-badge">
</div>

### 버전관리
<div>
  <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
  <img src="https://img.shields.io/badge/github Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white">
</div>

### 배포
<div>
  <img src="https://img.shields.io/badge/AWS S3-569A31?style=for-the-badge&logo=amazons3&logoColor=white">
  <img src="https://img.shields.io/badge/AWS Cloudfront-FF4F8B?style=for-the-badge">
  <img src="https://img.shields.io/badge/AWS Route53-8C4FFF?style=for-the-badge&logo=amazonroute53&logoColor=white">
</div>

### 협업툴
<div>
  <img src="https://img.shields.io/badge/discord-5865F2?style=for-the-badge&logo=discord&logoColor=white">
  <img src="https://img.shields.io/badge/Zep-6D1ED4?style=for-the-badge">
  <img src="https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white">
</div>

<br/>

## 2. 채택한 개발기술과 브랜치 전략
### 기술
- React의 컴포넌트 기반 구조와 Typescript 최신 기능을 활용하여 애플리케이션의 모듈화와 재사용성을 높였습니다
- Tailwind CSS의 유틸리티 클래스들을 사용하여 빠르고 일관된 스타일링을 구현했습니다
- Zustand를 활용하여 웹어플리케이션의 상태를 간단하고 직관적으로 관리했습니다, 또한 불필요한 리렌더링을 방지하고 성능을 최적화했습니다
- ESLint와 Prettier를 사용하여 코드 스타일을 자동으로 정리하고 일관성을 유지했습니다

### 브랜치 전략
- 프로젝트를 Fork하여 각자의 레포지토리에서 개발을 진행합니다
- 개발을 진행할 때에는 개발 유형에 맞게 개발유형/개발구역이름 형식으로 브랜치를 생성하여 작업합니다
- 예를 들어, 새로운 기능을 추가할 때는 feat/login, 버그를 수정할 때는 fix/bug123과 같은 형식을 사용합니다
- 개발구현이 완료된 후, Pull Request를 생성할때는 정해둔 양식에 따라 작성합니다
- PR 내용을 확인한 후, 이상이 없다면 dev 브랜치로 Merge를 진행합니다
- 병합 후 dev 브랜치의 안정성이 확보되면 main 브랜치로 병합하여 배포를 준비합니다

<br/>

## 3. Commit Convention
| 커밋 유형      | 의미                                     | 
|--------------|------------------------------------------|
| **Feat**     | 새로운 기능 추가                         |  
| **Fix**      | 버그 수정                        |  
| **Docs**     | 문서 수정                                | 
| **Design**   | 코드 스타일 변경 (코드 동작에는 영향을 주지 않는 변경) | 
| **Refactor** | 코드 리팩토링 (기능 변경 없음)    |  
| **Test**     | 테스트 코드 추가 또는 수정          | 
| **Chore**    | 빌드 관련 작업, 패키지 업데이트 등           | 
| **Other**    | 기타 변경   | 

<br/>

## 4. 프로젝트 구조
```
├── public
│   ├── images
│   └── fonts
├── src
│   ├── apis
│   │   ├── api
│   │   ├── services
│   │   └── utils
│   ├── assets
│   │   ├── images
│   ├── components
│   │   ├── common
│   │   │     └── button
│   │   │           ├── BtnHeart.tsx
│   │   │           └── ...
│   │   ├── layout
│   │   │     ├── Nav.tsx
│   │   │     ├── Footer.tsx
│   │   │     └── Layout.tsx
│   │   └── specific
│   │   │     ├── MainPopularCard.tsx
│   │   │     └── ...
│   ├── pages
│   │   ├── HomePage.tsx
│   │   └── ...
│   ├── store
│   │   └── store.ts
│   ├── types
│   │   └── type.ts
│   ├── utils
│   ├── App.js
│   ├── index.js
│   └── ...
├── .gitignore
├── package.json
├── README.md
└── ... 
```

## 5. 프로젝트
### Home Page
![home](https://github.com/user-attachments/assets/e4162863-9b6f-439f-902d-8c8d889d80e4)


### Login/SignIn Page
![회원가입 로그인](https://github.com/user-attachments/assets/6e8dec40-4d42-47d9-83ed-a7a1c1a6f1c7)


### Detail Page
![페이지상세](https://github.com/user-attachments/assets/dab6be61-d415-4a13-8a7f-49678babee8e)


### User- Mypage
![이용자-마이페이지](https://github.com/user-attachments/assets/b56b27d9-63be-45e6-bf29-9eedbdc1a6ff)


### Owner- Mypage
![의뢰자 마이페이지](https://github.com/user-attachments/assets/30804aa5-292e-4654-bd7d-2cbf7715c272)


### Provider- Mypage
![분석가 마이페이지](https://github.com/user-attachments/assets/485aca91-93f4-4a70-a9a6-fb8ad6e05edf)



<br/>

## 6. Architecture 및 ERD
### Architecture



