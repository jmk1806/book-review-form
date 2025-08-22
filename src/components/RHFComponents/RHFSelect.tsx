import type { RHFSelectProps } from '@/types/RHFComponents';
import { hasFieldError } from '@/utils/hasFieldError';
import { Select } from '@mui/material';
import { Controller, useFormContext, FieldValues } from 'react-hook-form';

export function RHFSelect<T extends FieldValues = FieldValues, V = unknown>({
  id,
  name,
  children,
  onChange,
  size = 'small',
}: RHFSelectProps<T, V>) {
  const { control, setValue } = useFormContext<T>();

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
            const value = e.target.value as V;
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
