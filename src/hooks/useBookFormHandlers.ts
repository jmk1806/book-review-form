import { UseFormSetValue, UseFormClearErrors } from 'react-hook-form';
import { ReadingStatus } from '@/types/BookInfo';
import type { BookReviewForm } from '@/types/BookReviewForm';

export const useBookFormHandlers = () => {
  const handleReadingStatusChange = (
    status: ReadingStatus,
    setValue: UseFormSetValue<BookReviewForm>,
    clearErrors: UseFormClearErrors<BookReviewForm>,
  ) => {
    clearErrors(['startDate', 'endDate']);
    if (status === ReadingStatus.WISH_TO_READ) {
      setValue('startDate', null);
      setValue('endDate', null);
    } else if (status === ReadingStatus.READING || status === ReadingStatus.ON_HOLD) {
      setValue('endDate', null);
    }
  };

  return {
    handleReadingStatusChange,
  };
};
