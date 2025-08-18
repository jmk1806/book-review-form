This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## Getting Started

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.

# book-review-form

## CheckList

- [ ] **폼 상태 관리**
  - [ ] 새로고침해도 폼 상태가 유지된다

- [ ] **앱 화면 미러링**
  - [ ] 폼 정보를 바탕으로 실시간으로 앱 화면에 반영된다
  - [ ] 500ms 지연 후 앱 화면 상태가 업데이트된다

- [ ] **유효성 검사 및 UI 처리**
  - [ ] 유효성 검사 실패 시, 가장 첫 번째 에러 필드에 자동 focus 된다
  - [ ] 모든 에러 필드 input의 아웃라인이 붉은색으로 표시된다
  - [ ] 에러 메시지가 해당 input 하단에 표시된다

- [ ] **인용구 관리 (RHF `useFieldArray`)**
  - [ ] 인용구를 여러 개 등록/삭제할 수 있다
  - [ ] 인용구가 **2개 이상**일 때, 모든 인용구 필드 하단에 페이지 번호 input이 추가된다
  - [ ] 페이지 번호 input은 숫자만 입력 가능하다
  - [ ] 페이지 번호는 책의 전체 페이지 수보다 작아야 한다
  - [ ] 인용구가 **2개 이상**일 때 페이지 번호 input은 **required**
  - [ ] 인용구가 **1개 이하**일 때 페이지 번호 input은 **optional**

- [ ] **반응형 동작**
  - [ ] `window` 크기 이벤트를 수신한다
  - [ ] viewport width가 **1024px 이상**일 때만 앱 화면이 보인다

- [ ] **재사용 가능한 입력 컴포넌트**
  - [ ] `CommaSeparatedInput` 컴포넌트 설계
    - [ ] 숫자만 입력 가능
    - [ ] 입력 시 자동으로 1000 단위 콤마 삽입
    - [ ] 컴포넌트 외부에서는 value를 number 타입으로 받을 수 있다
  - [ ] `RHFCommaSeparatedInput`으로 RHF와 매핑하여 재활용 가능
    - [ ] 별도의 `register` 없이 재사용 가능

- [ ] **자동완성 컴포넌트 (RHF + Suspense)**
  - [ ] 목록 API 응답 값을 기반으로 `AutoComplete.tsx` 옵션 목록 구성
  - [ ] API 로딩 중에는 로딩바 표시
  - [ ] API 에러 발생 시 `rejectedFallback` 컴포넌트와 서버 에러 메시지 표시
  - [ ] 정상적으로 응답되면 AutoComplete가 렌더링된다
