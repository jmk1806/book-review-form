import { z } from 'zod';
import { ReadingStatus } from './BookInfo';

export const QuoteSchema = z.object({
  page: z
    .number({ error: '페이지 번호가 필요합니다.' })
    .int('정수여야 합니다.')
    .min(1, '1 페이지 이상이어야 합니다.'),
  text: z.string({ error: '인용구 문구가 필요합니다.' }).min(1, '인용구를 입력하세요.'),
});
export type Quote = z.infer<typeof QuoteSchema>;

// 검증 함수에서 사용할 인터페이스
interface BookReviewFormData {
  status: string;
  startDate?: Date;
  endDate?: Date;
  rating: number;
  comment: string;
  quotes?: Quote[];
  totalPages: number;
}

// 1) 상태별 날짜 입력 제약
function validateStatusDates(data: BookReviewFormData, ctx: z.RefinementCtx) {
  const { status, startDate, endDate } = data;
  switch (status) {
    case 'WISH_TO_READ':
      if (startDate || endDate) {
        ctx.addIssue({
          code: 'custom',
          path: ['startDate'],
          message: '읽고 싶은 책 상태에서는 기간을 입력할 수 없습니다.',
        });
      }
      break;
    case 'READING':
    case 'ON_HOLD':
      if (!startDate) {
        ctx.addIssue({ code: 'custom', path: ['startDate'], message: '시작일을 입력해야 합니다.' });
      }
      if (endDate) {
        ctx.addIssue({
          code: 'custom',
          path: ['endDate'],
          message: '종료일을 입력할 수 없습니다.',
        });
      }
      break;
    case 'COMPLETED':
      if (!startDate || !endDate) {
        ctx.addIssue({
          code: 'custom',
          path: ['startDate'],
          message: '완료 상태에서는 시작일과 종료일이 모두 필요합니다.',
        });
      }
      break;
  }
}

// 2) 날짜 간 논리 검증
function validateDateLogic(data: BookReviewFormData, ctx: z.RefinementCtx) {
  const { startDate, endDate } = data;
  if (startDate && endDate && startDate > endDate) {
    ctx.addIssue({
      code: 'custom',
      path: ['startDate'],
      message: '시작일은 종료일보다 이전이어야 합니다.',
    });
  }
}

// 3) 별점 & 감상평 조건
function validateRatingComment(data: BookReviewFormData, ctx: z.RefinementCtx) {
  const { rating, comment } = data;
  if ((rating === 0.5 || rating === 5) && (!comment || comment.length < 100)) {
    ctx.addIssue({
      code: 'custom',
      path: ['comment'],
      message: '별점이 0.5 또는 5점인 경우, 최소 100자 이상의 감상평이 필요합니다.',
    });
  }
}

// 4) 인용구 페이지 번호 검증
function validateQuotesPages(data: BookReviewFormData, ctx: z.RefinementCtx) {
  const { quotes, totalPages } = data;
  quotes?.forEach((q: Quote, i: number) => {
    if (q.page > totalPages) {
      ctx.addIssue({
        code: 'custom',
        path: ['quotes', i, 'page'],
        message: `인용구 ${i + 1}의 페이지가 전체 페이지 수(${totalPages})를 초과합니다.`,
      });
    }
  });
}

export const BookReviewFormSchema = z
  .object({
    title: z.string().min(1),
    author: z.string().min(1),
    totalPages: z.number().min(1),
    status: z.enum(ReadingStatus),
    startDate: z.date(),
    endDate: z.date(),
    rating: z.number().min(1).max(5),
    comment: z.string().min(1),
    quotes: z.array(QuoteSchema),
    recommend: z.boolean(),
    visibility: z.boolean(),
  })
  .superRefine((data, ctx) => {
    validateStatusDates(data, ctx);
    validateDateLogic(data, ctx);
    validateRatingComment(data, ctx);
    validateQuotesPages(data, ctx);
  });

export type BookReviewForm = z.infer<typeof BookReviewFormSchema>;
