import { FormLabel, FormControlLabel, Radio } from '@mui/material';
import Grid from '@mui/material/Grid';
import { FormGrid } from '../Common';
import { RHFRadio } from '../RHFComponents';

export function Visibility() {
  return (
    <Grid container spacing={3}>
      <FormGrid size={12}>
        <FormLabel htmlFor="book-visibility">공개 여부</FormLabel>
        <RHFRadio id="book-visibility-radio" name="visibility">
          <FormControlLabel value="true" control={<Radio />} label="공개" />
          <FormControlLabel value="false" control={<Radio />} label="비공개" />
        </RHFRadio>
      </FormGrid>
    </Grid>
  );
}
