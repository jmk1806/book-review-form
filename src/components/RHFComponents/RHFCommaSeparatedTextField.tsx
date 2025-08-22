import { RHFTextFieldProps } from '@/types/RHFComponents';
import { hasFieldError } from '@/utils/hasFieldError';
import { TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

export function RHFCommaSeparatedTextField({
  id,
  name,
  placeholder,
  autoComplete,
  size = 'small',
  variant = 'outlined',
}: RHFTextFieldProps) {
  const { control } = useFormContext();
  const formatter = new Intl.NumberFormat();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          id={id}
          placeholder={placeholder}
          autoComplete={autoComplete}
          size={size}
          variant={variant}
          error={hasFieldError(fieldState.error)}
          helperText={fieldState.error?.message}
          value={formatter.format(field.value)}
          onChange={(e) => {
            field.onChange(e.target.value.replace(/[^0-9]/g, ''));
          }}
        />
      )}
    />
  );
}
