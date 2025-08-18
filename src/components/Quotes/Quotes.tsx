import { Button, TextField } from '@mui/material';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { useFormContext, Controller, useFieldArray } from 'react-hook-form';
import type { BookReviewForm } from '@/types/BookReviewForm';
import { hasFieldError } from '@/utils/hasFieldError';

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export function Quotes() {
  const { control } = useFormContext<BookReviewForm>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'quotes',
  });

  return (
    <Grid container spacing={3}>
      <FormGrid size={12} sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
        <FormLabel htmlFor="book-quotes">인용구</FormLabel>
        {fields.map((field, index) => (
          <Grid container spacing={3} key={field.id}>
            <FormGrid size={3}>
              <Controller
                name={`quotes.${index}.page`}
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    id={`book-quotes-${index}-page`}
                    placeholder="페이지"
                    size="small"
                    error={hasFieldError(fieldState.error)}
                    helperText={fieldState.error?.message}
                    type="number"
                    value={field.value ?? ''}
                    onChange={(e) =>
                      field.onChange(e.target.value === '' ? 0 : Number(e.target.value))
                    }
                  />
                )}
              />
            </FormGrid>
            <FormGrid size={9}>
              <Controller
                name={`quotes.${index}.text`}
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    id={`book-quotes-${index}`}
                    placeholder="인용구"
                    size="small"
                    error={hasFieldError(fieldState.error)}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </FormGrid>
          </Grid>
        ))}
        <Grid container spacing={3}>
          <FormGrid size={6}>
            <Button
              variant="outlined"
              color="warning"
              onClick={() => append({ page: 0, text: '' })}
            >
              인용구 추가
            </Button>
          </FormGrid>
          <FormGrid size={6}>
            <Button
              variant="outlined"
              color="warning"
              onClick={() => remove(fields.length - 1)}
              disabled={fields.length <= 1}
            >
              인용구 삭제
            </Button>
          </FormGrid>
        </Grid>
      </FormGrid>
    </Grid>
  );
}
