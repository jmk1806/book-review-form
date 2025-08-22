import { RHFTextFieldProps } from '@/types/RHFComponents';
import { TextField } from '@mui/material';
import { Controller, useFormContext, get } from 'react-hook-form';

export function RHFTextField({
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
          error={Boolean(get(errors, name))}
          helperText={get(errors, name)?.message}
        />
      )}
    />
  );
}
