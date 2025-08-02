import { FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { useFormContext, Controller } from 'react-hook-form';
import type { BookReviewForm } from '@/types/BookReviewForm';

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export function Visibility() {
  const { control } = useFormContext<BookReviewForm>();

  return (
    <Grid container spacing={3}>
      <FormGrid size={12}>
        <FormLabel htmlFor="book-visibility">공개 여부</FormLabel>
        <Controller
          name="visibility"
          control={control}
          render={({ field }) => (
            <RadioGroup
              {...field}
              sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}
              value={field.value.toString()}
              onChange={(e) => field.onChange(e.target.value === 'true')}
            >
              <FormControlLabel value="true" control={<Radio />} label="공개" />
              <FormControlLabel value="false" control={<Radio />} label="비공개" />
            </RadioGroup>
          )}
        />
      </FormGrid>
    </Grid>
  );
}
