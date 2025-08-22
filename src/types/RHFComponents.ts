import { PropsWithChildren } from 'react';
import { UseFormSetValue, FieldPath, PathValue, UseFormClearErrors } from 'react-hook-form';
import type { BookReviewForm } from './BookReviewForm';

export interface RHFProps {
  id: string;
}

export interface RHFTextFieldProps extends RHFProps {
  name: FieldPath<BookReviewForm>;
  placeholder?: string;
  autoComplete?: string;
  size?: 'small' | 'medium';
  variant?: 'outlined' | 'filled' | 'standard';
  multiline?: boolean;
  rows?: number;
}

export interface RHFSelectProps<T extends FieldPath<BookReviewForm>>
  extends RHFProps,
    PropsWithChildren {
  name: T;
  size?: 'small' | 'medium';
  onAfterChange?: (
    value: PathValue<BookReviewForm, T>,
    setValue: UseFormSetValue<BookReviewForm>,
    clearErrors: UseFormClearErrors<BookReviewForm>,
  ) => void;
}

export interface RHFDatePickerProps extends RHFProps {
  name: FieldPath<BookReviewForm>;
  size?: 'small' | 'medium';
  onAfterChange?: (value: Date | null, setValue: UseFormSetValue<BookReviewForm>) => void;
  disabled?: boolean;
}

export interface RHFRadioProps<T extends FieldPath<BookReviewForm>>
  extends RHFProps,
    PropsWithChildren {
  name: T;
  onAfterChange?: (
    value: PathValue<BookReviewForm, T>,
    setValue: UseFormSetValue<BookReviewForm>,
  ) => void;
}
