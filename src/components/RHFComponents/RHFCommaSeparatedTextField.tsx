import { RHFTextFieldProps } from '@/types/RHFComponents';
import { hasFieldError } from '@/utils/hasFieldError';
import { TextField } from '@mui/material';
import { Controller, useFormContext, get } from 'react-hook-form';

export function RHFCommaSeparatedTextField({
  id,
  name,
  placeholder,
  autoComplete,
  size = 'small',
  variant = 'outlined',
}: RHFTextFieldProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const formatter = new Intl.NumberFormat();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          id={id}
          placeholder={placeholder}
          autoComplete={autoComplete}
          size={size}
          variant={variant}
          error={hasFieldError(get(errors, name))}
          helperText={get(errors, name)?.message}
          value={formatter.format(field.value)}
          onChange={(e) => {
            field.onChange(e.target.value.replace(/[^0-9]/g, ''));
          }}
        />
      )}
    />
  );
}
