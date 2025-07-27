import { MenuItem, Select } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/material/styles';

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export function BookInfo() {
  return (
    <Grid container spacing={3}>
      <FormGrid size={12}>
        <FormLabel htmlFor="book-title" required>
          책 제목
        </FormLabel>
        <OutlinedInput
          id="book-title"
          name="book-title"
          type="text"
          placeholder="책 제목"
          autoComplete="book-title"
          required
          size="small"
        />
      </FormGrid>
      <FormGrid size={6}>
        <FormLabel htmlFor="book-author" required>
          저자
        </FormLabel>
        <OutlinedInput
          id="book-author"
          name="book-author"
          type="text"
          placeholder="저자"
          autoComplete="book-author"
          required
          size="small"
        />
      </FormGrid>
      <FormGrid size={6}>
        <FormLabel htmlFor="book-status" required>
          독서 상태
        </FormLabel>
        <Select id="book-status" name="book-status" required size="small">
          <MenuItem value="WISH_TO_READ">읽고 싶은 책</MenuItem>
          <MenuItem value="READING">읽는 중</MenuItem>
          <MenuItem value="COMPLETED">읽음</MenuItem>
          <MenuItem value="ON_HOLD">보류 중</MenuItem>
        </Select>
      </FormGrid>
    </Grid>
  );
}
