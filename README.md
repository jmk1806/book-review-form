This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## Getting Started

개발 서버 실행:

```bash
yarn dev
```

개발 서버 실행 뒤 [http://localhost:3000](http://localhost:3000)에서 결과물을 확인하실 수 있습니다.

## 기술 스택

- TypeScript
- Next (Page Router)
- React
- react-hook-form
- emotion

## 유효성 검증

### Zod를 선택한 이유?

- **React Hook Form 통합 지원**  
  `@hookform/resolvers/zod`를 이용해, Zod 스키마를 RHF의 `resolver`로 바로 연결하여 유효성 검사를 쉽게 적용할 수 있음
- **강력한 커스텀 검증**  
  `.refine()`, `.superRefine()`를 써서 필드 간 복잡한 조건(예: 상태별 날짜 제약, 별점에 따른 최소 글자 수 등)을 한 곳에서 처리할 수 있음
- 정확한 타입 추출(inference)  
  Zod는 스키마에서 바로 TypeScript 타입을 추론(infer)하기 때문에, `z.infer<typeof Schema>`를 통해 별도 타입 정의 없이도 검증 로직과 인터페이스를 일치시킬 수 있음
- 직관적인 선언형 API
  `.string()`, `.number().min().max()`, `.array().optional()` 같은 메서드 체이닝만으로 유효성 규칙을 읽기 쉽고 깔끔하게 작성할 수 있음

## 단계별 기능 설명

실제로 제출되는 전체 form의 타입은 `types/BookReviewForm.ts`의 `BookReviewFormSchema`를 참고해주세요.

### 1단계 : 도서의 기본 정보, 독서 상태, 독서 시작일 및 종료일

- 책 제목(title)
- 저자(author)
- 전체 페이지 수(totalPages)
- 독서 상태(status)
  - 읽고 싶은 책 : `WISH_TO_READ`
  - 읽는 중 : `READING`
  - 읽음 : `COMPLETED`
  - 보류 중 : `ON_HOLD`
- 출판일(publishDate)
- 시작일(startDate)
- 종료일(endDate)

### 2단계 : 도서 추천 여부, 별점

- 추천 여부(recommend)
- 별점(rating)
  - 0~5 사이의 수를 0.5 단위로 지정할 수 있다.

### 3단계 : 독후감

- 독후감(comment)
  - 별점이 2 ~ 4점 사이일 경우 독후감 필드는 입력하지 않아도 된다.
  - 그 외의 경우, 최소 100자 이상을 작성해야 한다.

### 4단계 : 인용구

- 페이지 번호(page)
  - 도서의 전체 페이지 수보다 작아야 한다.
- 인용구(text)

### 5단계 : 공개 여부

- 공개 여부(visibility)

## CheckList

- [ ] **폼 상태 관리**
  - [ ] 새로고침해도 폼 상태가 유지된다

- [ ] **앱 화면 미러링**
  - [ ] 폼 정보를 바탕으로 실시간으로 앱 화면에 반영된다
  - [ ] 500ms 지연 후 앱 화면 상태가 업데이트된다

- [ ] **유효성 검사 및 UI 처리**
  - [ ] 유효성 검사 실패 시, 가장 첫 번째 에러 필드에 자동 focus 된다
  - [x] 모든 에러 필드 input의 아웃라인이 붉은색으로 표시된다
  - [x] 에러 메시지가 해당 input 하단에 표시된다

- [x] **인용구 관리 (RHF `useFieldArray`)**
  - [x] 인용구를 여러 개 등록/삭제할 수 있다
  - [x] 인용구가 **2개 이상**일 때, 모든 인용구 필드 하단에 페이지 번호 input이 추가된다
  - [x] 페이지 번호 input은 숫자만 입력 가능하다
  - [x] 페이지 번호는 책의 전체 페이지 수보다 작아야 한다
  - [x] 인용구가 **2개 이상**일 때 페이지 번호 input은 **required**
  - [x] 인용구가 **1개 이하**일 때 페이지 번호 input은 **optional**

- [ ] **반응형 동작**
  - [ ] `window` 크기 이벤트를 수신한다
  - [ ] viewport width가 **1024px 이상**일 때만 앱 화면이 보인다

- [x] **재사용 가능한 입력 컴포넌트**
  - [x] `CommaSeparatedInput` 컴포넌트 설계
    - [x] 숫자만 입력 가능
    - [x] 입력 시 자동으로 1000 단위 콤마 삽입
    - [x] 컴포넌트 외부에서는 value를 number 타입으로 받을 수 있다
  - [x] `RHFCommaSeparatedInput`으로 RHF와 매핑하여 재활용 가능
    - [x] 별도의 `register` 없이 재사용 가능

- [ ] **자동완성 컴포넌트 (RHF + Suspense)**
  - [ ] 목록 API 응답 값을 기반으로 `AutoComplete.tsx` 옵션 목록 구성
  - [ ] API 로딩 중에는 로딩바 표시
  - [ ] API 에러 발생 시 `rejectedFallback` 컴포넌트와 서버 에러 메시지 표시
  - [ ] 정상적으로 응답되면 AutoComplete가 렌더링된다
