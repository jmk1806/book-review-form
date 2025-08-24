export const STEPS = [
  'book-info', // 1단계: 도서 기본 정보 + 독서 상태 + 시작/종료일
  'rating', // 2단계: 평점 & 코멘트
  'quotes', // 3단계: 주요 인용구
  'recommend', // 4단계: 추천 여부
  'visibility', // 5단계: 공개 여부
] as const;

export type Step = (typeof STEPS)[number];

export const STEP_LABELS: Record<Step, string> = {
  'book-info': '도서 기본 정보',
  rating: '평점 & 코멘트',
  quotes: '인용구',
  recommend: '추천 여부',
  visibility: '공개 여부',
};
