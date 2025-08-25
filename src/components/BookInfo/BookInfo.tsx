import { MenuItem } from '@mui/material';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import { useFormContext } from 'react-hook-form';
import type { BookReviewForm } from '@/types/BookReviewForm';
import { ReadingStatus } from '@/types/BookInfo';
import { FormGrid } from '../Common';
import {
  RHFTextField,
  RHFCommaSeparatedTextField,
  RHFSelect,
  RHFDatePicker,
} from '../RHFComponents';
import { useBookFormHandlers } from '@/hooks/useBookFormHandlers';

export function BookInfo() {
  const { watch } = useFormContext<BookReviewForm>();

  const { handleReadingStatusChange } = useBookFormHandlers();

  const startDateInputDisabled = watch('status') === ReadingStatus.WISH_TO_READ;
  const endDateInputDisabled = [
    ReadingStatus.WISH_TO_READ,
    ReadingStatus.READING,
    ReadingStatus.ON_HOLD,
  ].includes(watch('status'));

  return (
    <Grid container spacing={3}>
      <FormGrid size={12}>
        <FormLabel htmlFor="book-title">책 제목</FormLabel>
        <RHFTextField
          id="book-title"
          name="title"
          placeholder="책 제목"
          autoComplete="book-title"
        />
      </FormGrid>
      <FormGrid size={4}>
        <FormLabel htmlFor="book-author">저자</FormLabel>
        <RHFTextField
          id="book-author"
          name="author"
          placeholder="저자"
          autoComplete="book-author"
        />
      </FormGrid>
      <FormGrid size={4}>
        <FormLabel htmlFor="book-page">전체 페이지</FormLabel>
        <RHFCommaSeparatedTextField
          id="book-page"
          name="totalPages"
          placeholder="전체 페이지"
          autoComplete="book-page"
        />
      </FormGrid>
      <FormGrid size={4}>
        <FormLabel htmlFor="book-status">독서 상태</FormLabel>
        <RHFSelect id="book-status" name="status" onAfterChange={handleReadingStatusChange}>
          <MenuItem value={ReadingStatus.WISH_TO_READ}>읽고 싶은 책</MenuItem>
          <MenuItem value={ReadingStatus.READING}>읽는 중</MenuItem>
          <MenuItem value={ReadingStatus.COMPLETED}>읽음</MenuItem>
          <MenuItem value={ReadingStatus.ON_HOLD}>보류 중</MenuItem>
        </RHFSelect>
      </FormGrid>
      <FormGrid size={4}>
        <FormLabel htmlFor="publish-date">출판일</FormLabel>
        <RHFDatePicker name="publishDate" />
      </FormGrid>
      <FormGrid size={4}>
        <FormLabel htmlFor="start-date">시작일</FormLabel>
        <RHFDatePicker name="startDate" disabled={startDateInputDisabled} />
      </FormGrid>
      <FormGrid size={4}>
        <FormLabel htmlFor="end-date">종료일</FormLabel>
        <RHFDatePicker name="endDate" disabled={endDateInputDisabled} />
      </FormGrid>
    </Grid>
  );
}
