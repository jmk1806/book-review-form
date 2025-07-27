import { MenuItem, Select } from '@mui/material';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/material/styles';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useFormContext, Controller } from 'react-hook-form';
import type { BookReviewForm } from '@/types/BookReviewForm';
import { ReadingStatus } from '@/types/BookInfo';
import dayjs from 'dayjs';

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export function BookInfo() {
  const {
    register,
    watch,
    control,
    formState: { errors },
  } = useFormContext<BookReviewForm>();

  const startDateInputDisabled = watch('status') === ReadingStatus.WISH_TO_READ;
  const endDateInputDisabled = [
    ReadingStatus.WISH_TO_READ,
    ReadingStatus.READING,
    ReadingStatus.ON_HOLD,
  ].includes(watch('status'));

  return (
    <Grid container spacing={3}>
      <FormGrid size={12}>
        <FormLabel htmlFor="book-title" required>
          책 제목
        </FormLabel>
        <Controller
          name="title"
          control={control}
          render={({ field, fieldState }) => (
            <OutlinedInput
              {...field}
              id="book-title"
              placeholder="책 제목"
              autoComplete="book-title"
              required
              size="small"
              error={!!fieldState.error}
            />
          )}
        />
      </FormGrid>
      <FormGrid size={4}>
        <FormLabel htmlFor="book-author" required>
          저자
        </FormLabel>
        <Controller
          name="author"
          control={control}
          render={({ field, fieldState }) => (
            <OutlinedInput
              {...field}
              id="book-author"
              placeholder="저자"
              autoComplete="book-author"
              required
              size="small"
              error={!!fieldState.error}
            />
          )}
        />
      </FormGrid>
      <FormGrid size={4}>
        <FormLabel htmlFor="book-page" required>
          전체 페이지
        </FormLabel>
        <Controller
          name="totalPages"
          control={control}
          render={({ field, fieldState }) => (
            <OutlinedInput
              {...field}
              id="book-page"
              type="number"
              placeholder="전체 페이지"
              autoComplete="book-page"
              required
              size="small"
              error={!!fieldState.error}
              onChange={(e) => field.onChange(Number(e.target.value))}
            />
          )}
        />
      </FormGrid>
      <FormGrid size={4}>
        <FormLabel htmlFor="book-status" required>
          독서 상태
        </FormLabel>
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <Select {...field} id="book-status" required size="small" error={!!errors.status}>
              <MenuItem value={ReadingStatus.WISH_TO_READ}>읽고 싶은 책</MenuItem>
              <MenuItem value={ReadingStatus.READING}>읽는 중</MenuItem>
              <MenuItem value={ReadingStatus.COMPLETED}>읽음</MenuItem>
              <MenuItem value={ReadingStatus.ON_HOLD}>보류 중</MenuItem>
            </Select>
          )}
        />
      </FormGrid>
      <FormGrid size={3}>
        <FormLabel htmlFor="start-date" required>
          시작일
        </FormLabel>
        <Controller
          name="startDate"
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
                  error: !!errors.startDate,
                  helperText: errors.startDate?.message,
                },
              }}
              disabled={startDateInputDisabled}
            />
          )}
        />
      </FormGrid>
      <FormGrid size={3}>
        <FormLabel htmlFor="end-date" required>
          종료일
        </FormLabel>
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
