import { FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import StarRating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';
import { useFormContext, Controller } from 'react-hook-form';
import type { BookReviewForm } from '@/types/BookReviewForm';

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export function Rating() {
  const { control } = useFormContext<BookReviewForm>();

  return (
    <Grid container spacing={3}>
      <FormGrid size={12}>
        <FormLabel htmlFor="book-recommend">도서 추천 여부</FormLabel>
        <Controller
          name="recommend"
          control={control}
          render={({ field }) => (
            <RadioGroup
              {...field}
              sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}
              value={field.value.toString()}
              onChange={(e) => field.onChange(e.target.value === 'true')}
            >
              <FormControlLabel value="true" control={<Radio />} label="추천" />
              <FormControlLabel value="false" control={<Radio />} label="비추천" />
            </RadioGroup>
          )}
        />
      </FormGrid>
      <FormGrid size={12}>
        <FormLabel htmlFor="book-rating">도서 평점</FormLabel>
        <Controller
          name="rating"
          control={control}
          render={({ field, fieldState }) => (
            <StarRating
              {...field}
              value={field.value}
              onChange={(_, newValue) => field.onChange(newValue || 0)}
              precision={0.5}
              emptyLabelText={fieldState.error?.message}
            />
          )}
        />
      </FormGrid>
      <FormGrid size={12}>
        <FormLabel htmlFor="book-comment">독후감</FormLabel>
        <Controller
          name="comment"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              id="book-comment"
              placeholder="독후감"
              multiline
              rows={4}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
      </FormGrid>
    </Grid>
  );
}
