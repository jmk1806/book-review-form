import { PropsWithChildren } from 'react';
import { UseFormSetValue, FieldPath } from 'react-hook-form';
import type { BookReviewForm } from './BookReviewForm';
import { ReadingStatus } from './BookInfo';

export interface RHFProps {
  id: string;
  name: FieldPath<BookReviewForm>;
}

export interface RHFTextFieldProps extends RHFProps {
  placeholder?: string;
  autoComplete?: string;
  size?: 'small' | 'medium';
  variant?: 'outlined' | 'filled' | 'standard';
}

export interface RHFSelectProps extends RHFProps, PropsWithChildren {
  size?: 'small' | 'medium';
  onChange?: (value: ReadingStatus, setValue: UseFormSetValue<BookReviewForm>) => void;
}

export interface RHFDatePickerProps extends RHFProps {
  size?: 'small' | 'medium';
  onChange?: (value: Date | null, setValue: UseFormSetValue<BookReviewForm>) => void;
  disabled?: boolean;
}
