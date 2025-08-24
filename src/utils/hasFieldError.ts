import type { FieldError } from 'react-hook-form';

export function hasFieldError(error?: FieldError): boolean {
  return Boolean(error);
}
