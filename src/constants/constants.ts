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

export enum ReadingStatus {
  WISH_TO_READ = 'WISH_TO_READ',
  READING = 'READING',
  COMPLETED = 'COMPLETED',
  ON_HOLD = 'ON_HOLD',
}

export const READING_STATUS_LABELS: Record<ReadingStatus, string> = {
  [ReadingStatus.WISH_TO_READ]: '읽고 싶은 책',
  [ReadingStatus.READING]: '읽는 중',
  [ReadingStatus.COMPLETED]: '읽음',
  [ReadingStatus.ON_HOLD]: '보류 중',
};
