import type { RHFSelectProps } from '@/types/RHFComponents';
import type { BookReviewForm } from '@/types/BookReviewForm';
import { hasFieldError } from '@/utils/hasFieldError';
import { Select } from '@mui/material';
import { Controller, useFormContext, FieldPath, PathValue } from 'react-hook-form';

export function RHFSelect<T extends FieldPath<BookReviewForm>>({
  id,
  name,
  children,
  onAfterChange,
  size = 'small',
}: RHFSelectProps<T>) {
  const { control, setValue, clearErrors } = useFormContext<BookReviewForm>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, ...field }, fieldState }) => (
        <Select
          {...field}
          inputRef={ref}
          id={id}
          size={size}
          error={hasFieldError(fieldState.error)}
          onChange={(e) => {
            field.onChange(e.target.value);
            if (onAfterChange) {
              onAfterChange(e.target.value as PathValue<BookReviewForm, T>, setValue, clearErrors);
            }
          }}
        >
          {children}
        </Select>
      )}
    />
  );
}
