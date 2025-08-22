import { RHFDatePickerProps } from '@/types/RHFComponents';
import type { BookReviewForm } from '@/types/BookReviewForm';
import { useFormContext, Controller, get } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { hasFieldError } from '@/utils/hasFieldError';

export function RHFDatePicker({
  id,
  name,
  onChange,
  size = 'small',
  disabled = false,
}: RHFDatePickerProps) {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext<BookReviewForm>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <DatePicker
          {...field}
          value={field.value && field.value instanceof Date ? dayjs(field.value) : null}
          onChange={(newValue) => {
            const dateValue = newValue ? newValue.toDate() : null;
            field.onChange(dateValue);
            if (onChange) {
              onChange(dateValue, setValue);
            }
          }}
          slotProps={{
            textField: {
              size,
              error: hasFieldError(get(errors, name)),
              helperText: get(errors, name)?.message,
            },
          }}
          disabled={disabled}
        />
      )}
    />
  );
}
