import { css } from '@emotion/css';
import { Grid, GridProps } from '@mui/material';

const formGridStyles = css`
  display: flex;
  flex-direction: column;
`;

export function FormGrid(props: GridProps) {
  return (
    <Grid {...props} className={formGridStyles}>
      {props.children}
    </Grid>
  );
}
