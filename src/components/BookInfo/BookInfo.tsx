import { MenuItem, Select, TextField } from '@mui/material';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useFormContext, Controller } from 'react-hook-form';
import type { BookReviewForm } from '@/types/BookReviewForm';
import { ReadingStatus } from '@/types/BookInfo';
import dayjs from 'dayjs';
import { useEffect } from 'react';

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export function BookInfo() {
  const {
    watch,
    control,
    formState: { errors },
    setValue,
  } = useFormContext<BookReviewForm>();

  const startDateInputDisabled = watch('status') === ReadingStatus.WISH_TO_READ;
  const endDateInputDisabled = [
    ReadingStatus.WISH_TO_READ,
    ReadingStatus.READING,
    ReadingStatus.ON_HOLD,
  ].includes(watch('status'));

  useEffect(() => {
    if (startDateInputDisabled) {
      setValue('startDate', null);
    } else {
      setValue('startDate', new Date());
    }
    if (endDateInputDisabled) {
      setValue('endDate', null);
    } else {
      setValue('endDate', new Date());
    }
  }, [startDateInputDisabled, endDateInputDisabled, setValue]);

  return (
    <Grid container spacing={3}>
      <FormGrid size={12}>
        <FormLabel htmlFor="book-title">책 제목</FormLabel>
        <Controller
          name="title"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              id="book-title"
              placeholder="책 제목"
              autoComplete="book-title"
              size="small"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              variant="outlined"
            />
          )}
        />
      </FormGrid>
      <FormGrid size={4}>
        <FormLabel htmlFor="book-author">저자</FormLabel>
        <Controller
          name="author"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              id="book-author"
              placeholder="저자"
              autoComplete="book-author"
              size="small"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              variant="outlined"
            />
          )}
        />
      </FormGrid>
      <FormGrid size={4}>
        <FormLabel htmlFor="book-page">전체 페이지</FormLabel>
        <Controller
          name="totalPages"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              id="book-page"
              type="number"
              placeholder="전체 페이지"
              autoComplete="book-page"
              size="small"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              variant="outlined"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                field.onChange(Number(e.target.value))
              }
            />
          )}
        />
      </FormGrid>
      <FormGrid size={4}>
        <FormLabel htmlFor="book-status">독서 상태</FormLabel>
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <Select {...field} id="book-status" size="small" error={!!errors.status}>
              <MenuItem value={ReadingStatus.WISH_TO_READ}>읽고 싶은 책</MenuItem>
              <MenuItem value={ReadingStatus.READING}>읽는 중</MenuItem>
              <MenuItem value={ReadingStatus.COMPLETED}>읽음</MenuItem>
              <MenuItem value={ReadingStatus.ON_HOLD}>보류 중</MenuItem>
            </Select>
          )}
        />
      </FormGrid>
      <FormGrid size={4}>
        <FormLabel htmlFor="publish-date">출판일</FormLabel>
        <Controller
          name="publishDate"
          control={control}
          render={({ field }) => (
            <DatePicker
              value={field.value ? dayjs(field.value) : null}
              onChange={(newValue) => {
                field.onChange(newValue ? newValue.toDate() : new Date());
              }}
              slotProps={{
                textField: {
                  size: 'small',
                  error: !!errors.publishDate,
                  helperText: errors.publishDate?.message,
                },
              }}
            />
          )}
        />
      </FormGrid>
      <FormGrid size={4}>
        <FormLabel htmlFor="start-date">시작일</FormLabel>
        <Controller
          name="startDate"
          control={control}
          render={({ field }) => (
            <DatePicker
              value={field.value ? dayjs(field.value) : null}
              onChange={(newValue) => {
                field.onChange(newValue ? newValue.toDate() : null);
              }}
              slotProps={{
                textField: {
                  size: 'small',
                  error: !!errors.startDate,
                  helperText: errors.startDate?.message,
                },
              }}
              disabled={startDateInputDisabled}
            />
          )}
        />
      </FormGrid>
      <FormGrid size={4}>
        <FormLabel htmlFor="end-date">종료일</FormLabel>
        <Controller
          name="endDate"
          control={control}
          render={({ field }) => (
            <DatePicker
              value={field.value ? dayjs(field.value) : null}
              onChange={(newValue) => {
                field.onChange(newValue ? newValue.toDate() : new Date());
              }}
              slotProps={{
                textField: {
                  size: 'small',
                  error: !!errors.endDate,
                  helperText: errors.endDate?.message,
                },
              }}
              disabled={endDateInputDisabled}
            />
          )}
        />
      </FormGrid>
    </Grid>
  );
}
