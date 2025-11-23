import { RHFDatePickerProps } from '@/types/RHFComponents';
import type { BookReviewForm } from '@/types/BookReviewForm';
import { useFormContext, Controller, get } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { hasFieldError } from '@/utils/hasFieldError';
import { useState, useRef } from 'react';

export function RHFDatePicker({
  name,
  size = 'small',
  disabled = false,
  onAfterChange,
}: RHFDatePickerProps) {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext<BookReviewForm>();

  const [open, setOpen] = useState(false);
  const openedByFocusRef = useRef(false);

  const handleOpen = () => {
    if (disabled) return;
    setOpen(true);
    openedByFocusRef.current = false; // 수동으로 열린 경우 플래그 false 설정
  };

  const handleClose = () => {
    setOpen(false);
    // onFocus로 열린 경우에 플래그 false로 변경
    if (openedByFocusRef.current) {
      // DatePicker가 닫힌 후 input 필드로 포커스가 돌아가면서 onFocus 이벤트가 즉시 발생하여 달력이 다시 열리는 것을 방지하기 위해 딜레이 적용
      setTimeout(() => {
        openedByFocusRef.current = false;
      }, 100);
    }
  };

  const handleFocus = () => {
    if (disabled || open) return;
    if (!openedByFocusRef.current) {
      setOpen(true);
      openedByFocusRef.current = true; // 자동으로 열린 경우 플래그 true 설정
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, ...field } }) => (
        <DatePicker
          {...field}
          open={open}
          onOpen={handleOpen}
          onClose={handleClose}
          value={field.value && field.value instanceof Date ? dayjs(field.value) : null}
          onChange={(newValue) => {
            const dateValue = newValue ? newValue.toDate() : null;
            field.onChange(dateValue);
            if (onAfterChange) {
              onAfterChange(dateValue, setValue);
            }
            // 날짜 선택 후 팝업 닫기
            setOpen(false);
          }}
          slotProps={{
            textField: {
              inputRef: ref,
              size,
              error: hasFieldError(get(errors, name)),
              helperText: get(errors, name)?.message,
              onFocus: handleFocus,
            },
          }}
          disabled={disabled}
        />
      )}
    />
  );
}
