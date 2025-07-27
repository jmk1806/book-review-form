import { FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export function Visibility() {
  return (
    <Grid container spacing={3}>
      <FormGrid size={12}>
        <FormLabel htmlFor="book-visibility" required>
          도서 공개 여부
        </FormLabel>
        <RadioGroup sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
          <FormControlLabel value="true" control={<Radio />} label="공개" />
          <FormControlLabel value="false" control={<Radio />} label="비공개" />
        </RadioGroup>
      </FormGrid>
    </Grid>
  );
}
