import { FormControlLabel, MenuItem, Radio, RadioGroup, TextField } from '@mui/material';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import StarRating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export function Rating() {
  return (
    <Grid container spacing={3}>
      <FormGrid size={12}>
        <FormLabel htmlFor="book-recommend" required>
          도서 추천 여부
        </FormLabel>
        <RadioGroup sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
          <FormControlLabel value="true" control={<Radio />} label="추천" />
          <FormControlLabel value="false" control={<Radio />} label="비추천" />
        </RadioGroup>
      </FormGrid>
      <FormGrid size={12}>
        <FormLabel htmlFor="book-rating" required>
          도서 평점
        </FormLabel>
        <StarRating name="book-rating" defaultValue={2.5} precision={0.5} />
      </FormGrid>
      <FormGrid size={12}>
        <FormLabel htmlFor="book-comment" required>
          감상평
        </FormLabel>
        <TextField id="book-comment" name="book-comment" placeholder="감상평" multiline rows={4} />
      </FormGrid>
    </Grid>
  );
}
