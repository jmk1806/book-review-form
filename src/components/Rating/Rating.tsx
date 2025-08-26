import { FormControlLabel, FormHelperText, Radio } from '@mui/material';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import StarRating from '@mui/material/Rating';
import { useFormContext, Controller } from 'react-hook-form';
import type { BookReviewForm } from '@/types/BookReviewForm';
import { hasFieldError } from '@/utils/hasFieldError';
import { FormGrid } from '../Common';
import { RHFRadio, RHFTextField } from '../RHFComponents';

export function Rating() {
  const { control } = useFormContext<BookReviewForm>();

  return (
    <Grid container spacing={3}>
      <FormGrid size={12}>
        <FormLabel htmlFor="book-recommend">도서 추천 여부</FormLabel>
        <RHFRadio id="book-recommend-radio" name="recommend">
          <FormControlLabel value="true" control={<Radio />} label="추천" />
          <FormControlLabel value="false" control={<Radio />} label="비추천" />
        </RHFRadio>
      </FormGrid>
      <FormGrid size={12}>
        <FormLabel htmlFor="book-rating">도서 평점</FormLabel>
        <Controller
          name="rating"
          control={control}
          render={({ field, fieldState }) => (
            <>
              <StarRating
                {...field}
                value={field.value}
                onChange={(_, newValue) => field.onChange(newValue ?? 0)}
                precision={0.5}
              />
              {fieldState.error && (
                <FormHelperText error={hasFieldError(fieldState.error)}>
                  {fieldState.error?.message}
                </FormHelperText>
              )}
            </>
          )}
        />
      </FormGrid>
      <FormGrid size={12}>
        <FormLabel htmlFor="book-comment">독후감</FormLabel>
        <RHFTextField
          id="book-comment"
          name="comment"
          placeholder="독후감"
          autoComplete="book-comment"
          multiline
          rows={4}
        />
      </FormGrid>
    </Grid>
  );
}
