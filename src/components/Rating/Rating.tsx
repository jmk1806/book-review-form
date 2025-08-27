import { FormControlLabel, Radio } from '@mui/material';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import { FormGrid } from '../Common';
import { RHFRadio, RHFSelect, RHFTextField } from '../RHFComponents';
import MenuItem from '@mui/material/MenuItem';

export function Rating() {
  return (
    <Grid container spacing={3}>
      <FormGrid size={12}>
        <FormLabel htmlFor="book-recommend">도서 추천 여부</FormLabel>
        <RHFRadio id="book-recommend-radio" name="recommend">
          <FormControlLabel value="true" control={<Radio />} label="추천" />
          <FormControlLabel value="false" control={<Radio />} label="비추천" />
        </RHFRadio>
      </FormGrid>
      <FormGrid size={3}>
        <FormLabel htmlFor="book-rating">도서 평점</FormLabel>
        <RHFSelect id="book-rating" name="rating">
          <MenuItem value={0}>0</MenuItem>
          <MenuItem value={0.5}>0.5</MenuItem>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={1.5}>1.5</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={2.5}>2.5</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={3.5}>3.5</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={4.5}>4.5</MenuItem>
          <MenuItem value={5}>5</MenuItem>
        </RHFSelect>
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
