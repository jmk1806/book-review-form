import { RHFTextFieldProps } from '@/types/RHFComponents';
import { hasFieldError } from '@/utils/hasFieldError';
import { TextField } from '@mui/material';
import { useMemo } from 'react';
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
  const formatter = useMemo(() => new Intl.NumberFormat(), []);

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
          inputProps={{ inputMode: 'numeric' }}
          value={formatter.format(field.value)}
          onChange={(e) => {
            const newValue = Number(e.target.value.replace(/[^0-9]/g, ''));
            field.onChange(newValue);
          }}
        />
      )}
    />
  );
}
