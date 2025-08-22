import { PropsWithChildren } from 'react';
import { FieldValues, UseFormSetValue, Path } from 'react-hook-form';

export interface RHFProps<T extends FieldValues = FieldValues> {
  id: string;
  name: Path<T>;
}

export interface RHFTextFieldProps<T extends FieldValues = FieldValues> extends RHFProps<T> {
  placeholder?: string;
  autoComplete?: string;
  size?: 'small' | 'medium';
  variant?: 'outlined' | 'filled' | 'standard';
}

export interface RHFSelectProps<T extends FieldValues = FieldValues, V = unknown>
  extends RHFProps<T>,
    PropsWithChildren {
  size?: 'small' | 'medium';
  onChange?: (value: V, setValue: UseFormSetValue<T>) => void;
}
