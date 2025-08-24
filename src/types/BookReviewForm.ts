import { z } from 'zod';
import { ReadingStatus } from './BookInfo';
import dayjs from 'dayjs';

export const QuoteSchema = z.object({
  page: z.number().int().optional(),
  text: z.string({ error: '인용구 문구가 필요합니다.' }).min(1, '인용구를 입력하세요.'),
});
export type Quote = z.infer<typeof QuoteSchema>;

// 검증 함수에서 사용할 인터페이스
interface BookReviewFormData {
  status: string;
  publishDate: Date;
  startDate?: Date | null;
  endDate?: Date | null;
  rating: number;
  comment?: string;
  quotes?: Array<{ page?: number; text: string }>;
  totalPages: number;
}

// 1) 상태별 날짜 입력 제약
function validateStatusDates(data: BookReviewFormData, ctx: z.RefinementCtx) {
  const { status, startDate, endDate } = data;
  switch (status) {
    case 'WISH_TO_READ':
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
  const { startDate, endDate, publishDate, status } = data;
  const today = dayjs();

  if (today.isBefore(publishDate)) {
    ctx.addIssue({
      code: 'custom',
      path: ['publishDate'],
      message: '출판일은 오늘 이후일 수 없습니다.',
    });
  }

  if (status === ReadingStatus.READING || status === ReadingStatus.ON_HOLD) {
    if (!startDate) {
      ctx.addIssue({
        code: 'custom',
        path: ['startDate'],
        message: '읽는 중 또는 보류 중인 책의 경우, 시작일을 입력해야 합니다.',
      });
    }
  } else if (startDate && dayjs(publishDate).isAfter(startDate)) {
    ctx.addIssue({
      code: 'custom',
      path: ['startDate'],
      message: '시작일은 출판일보다 이후여야 합니다.',
    });
  }

  if (status === ReadingStatus.COMPLETED) {
    if (!startDate) {
      ctx.addIssue({
        code: 'custom',
        path: ['startDate'],
        message: '시작일이 필요합니다.',
      });
    }
    if (!endDate) {
      ctx.addIssue({
        code: 'custom',
        path: ['endDate'],
        message: '종료일이 필요합니다.',
      });
    }
    if (startDate && endDate) {
      // 두 날짜가 모두 존재할 때만 검증
      if (dayjs(startDate).isAfter(dayjs(endDate))) {
        ctx.addIssue({
          code: 'custom',
          path: ['startDate'],
          message: '시작일은 종료일보다 이전이어야 합니다.',
        });
        ctx.addIssue({
          code: 'custom',
          path: ['endDate'],
          message: '종료일은 시작일보다 이후여야 합니다.',
        });
      }
    }
  }
}

// 3) 별점 & 감상평 조건
function validateRatingComment(data: BookReviewFormData, ctx: z.RefinementCtx) {
  const { rating, comment } = data;
  if (rating >= 2 && rating <= 4) return;
  if ((comment?.length ?? 0) < 100) {
    ctx.addIssue({
      code: 'custom',
      path: ['comment'],
      message: '별점이 2점 미만 또는 4.5점 이상인 경우, 최소 100자 이상의 감상평이 필요합니다.',
    });
  }
}

// 4) 인용구 페이지 번호 검증
function validateQuotesPages(data: BookReviewFormData, ctx: z.RefinementCtx) {
  const { quotes, totalPages } = data;

  if (!quotes || quotes.length === 0) return;

  // 인용구가 1개일 때는 페이지 번호 검증을 건너뜀 (UI에서 입력받지 않음)
  if (quotes.length === 1) return;

  quotes.forEach((q, i: number) => {
    // 인용구가 2개 이상일 때는 페이지 번호가 필수
    if (quotes.length >= 2 && !q.page) {
      ctx.addIssue({
        code: 'custom',
        path: ['quotes', i, 'page'],
        message: '인용구가 2개 이상일 때는 페이지 번호가 필수입니다.',
      });
      return;
    }

    // 페이지 번호가 있는 경우, 전체 페이지 수를 초과하는지 검증
    if (q.page && q.page > totalPages) {
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
    title: z.string().min(1, '책 제목을 입력하세요.'),
    author: z.string().min(1, '저자를 입력하세요.'),
    totalPages: z.number().min(1, '전체 페이지 수를 입력하세요.'),
    status: z.enum(ReadingStatus),
    publishDate: z.date(),
    startDate: z.date().optional().nullable(),
    endDate: z.date().optional().nullable(),
    rating: z.number().min(0.5, '별점을 입력하세요.').max(5, '별점은 5점 이하여야 합니다.'),
    comment: z.string().optional(),
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
