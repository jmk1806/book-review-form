import { BookReviewForm } from '@/types/BookReviewForm';

export const FIELD_LABELS: Record<keyof BookReviewForm, string> = {
  title: '책 제목',
  author: '저자',
  totalPages: '전체 페이지',
  status: '독서 상태',
  publishDate: '출판일',
  startDate: '시작일',
  endDate: '종료일',
  rating: '도서 평점',
  comment: '독후감',
  quotes: '인용구',
  recommend: '도서 추천 여부',
  visibility: '공개 여부',
};
