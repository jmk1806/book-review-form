import { RHFTextFieldProps } from '@/types/RHFComponents';
import { hasFieldError } from '@/utils/hasFieldError';
import { TextField } from '@mui/material';
import { Controller, useFormContext, get } from 'react-hook-form';

export function RHFTextField({
  id,
  name,
  placeholder,
  autoComplete,
  size = 'small',
  variant = 'outlined',
  multiline = false,
  rows,
  onChange,
}: RHFTextFieldProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, ...field } }) => (
        <TextField
          {...field}
          inputRef={ref}
          id={id}
          placeholder={placeholder}
          autoComplete={autoComplete}
          size={size}
          variant={variant}
          error={hasFieldError(get(errors, name))}
          helperText={get(errors, name)?.message}
          multiline={multiline}
          rows={rows}
          onChange={(e) => {
            field.onChange(e);
            if (onChange) {
              onChange(e.target.value);
            }
          }}
        />
      )}
    />
  );
}
