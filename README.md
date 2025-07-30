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

- 도서의 기본 정보
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

- 도서의 추천 여부
  - 추천 여부(recommend)
  - 별점(rating)
    - 0~5 사이의 수를 0.5 단위로 지정할 수 있다.

### 3단계 : 독후감

- 독후감
  - 별점이 2 ~ 4점 사이일 경우 독후감 필드는 입력하지 않아도 된다.
  - 그 외의 경우, 최소 100자 이상을 작성해야 한다.

### 4단계 : 인용구

- 인용구
  - 페이지 번호(page)
    - 도서의 전체 페이지 수보다 작아야 한다.
  - 인용구(text)

### 5단계 : 공개 여부

- 공개 여부(visibility)
