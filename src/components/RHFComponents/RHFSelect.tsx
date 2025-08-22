import type { RHFSelectProps } from '@/types/RHFComponents';
import type { BookReviewForm } from '@/types/BookReviewForm';
import { ReadingStatus } from '@/types/BookInfo';
import { hasFieldError } from '@/utils/hasFieldError';
import { Select } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

export function RHFSelect({ id, name, children, onChange, size = 'small' }: RHFSelectProps) {
  const { control, setValue } = useFormContext<BookReviewForm>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Select
          {...field}
          id={id}
          size={size}
          error={hasFieldError(fieldState.error)}
          onChange={(e) => {
            const value = e.target.value as ReadingStatus;
            field.onChange(value);
            if (onChange) {
              onChange(value, setValue);
            }
          }}
        >
          {children}
        </Select>
      )}
    />
  );
}
