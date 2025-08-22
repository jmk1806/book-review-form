import { RHFRadioProps } from '@/types/RHFComponents';
import { Controller, PathValue, useFormContext } from 'react-hook-form';
import type { BookReviewForm } from '@/types/BookReviewForm';
import { RadioGroup } from '@mui/material';
import { FieldPath } from 'react-hook-form';

export function RHFRadio<T extends FieldPath<BookReviewForm>>({
  id,
  name,
  children,
  onAfterChange,
}: RHFRadioProps<T>) {
  const { control, setValue } = useFormContext<BookReviewForm>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <RadioGroup
          {...field}
          sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}
          id={id}
          onChange={(e) => {
            field.onChange(e.target.value);
            if (onAfterChange) {
              onAfterChange(e.target.value as PathValue<BookReviewForm, T>, setValue);
            }
          }}
        >
          {children}
        </RadioGroup>
      )}
    />
  );
}
