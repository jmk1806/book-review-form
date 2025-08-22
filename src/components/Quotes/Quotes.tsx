import { Button } from '@mui/material';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import { useFormContext, useFieldArray } from 'react-hook-form';
import type { BookReviewForm } from '@/types/BookReviewForm';
import { FormGrid } from '../Common';
import { RHFCommaSeparatedTextField, RHFTextField } from '../RHFComponents';

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
              <RHFCommaSeparatedTextField
                id={`book-quotes-${index}-page`}
                name={`quotes.${index}.page`}
                placeholder="페이지"
                autoComplete="book-quotes-page"
              />
            </FormGrid>
            <FormGrid size={9}>
              <RHFTextField
                id={`book-quotes-${index}`}
                name={`quotes.${index}.text`}
                placeholder="인용구"
                autoComplete="book-quotes-text"
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
