import { BookInfo } from '@/components/BookInfo';
import { Box, Button, Card, CardContent, Container, Grid } from '@mui/material';
import { Rating } from '@/components/Rating';
import { Quotes } from '@/components/Quotes';
import { Visibility } from '@/components/Visibility';
import { useFormContext } from 'react-hook-form';
import type { BookReviewForm } from '@/types/BookReviewForm';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { Preview } from '@/components/Preview';

export default function ReviewPage() {
  const {
    formState: { errors: formErrors },
    getValues,
    handleSubmit,
    setFocus,
  } = useFormContext<BookReviewForm>();

  const onSubmit = () => {
    window.alert('유효성 검증 통과!');
    console.log('🔴 Form Values:', getValues());
  };

  const isPreviewAvailable = useMediaQuery('(min-width: 1200px)');

  const handleLogErrors = () => {
    // 첫 번째 에러 필드로 포커스 이동
    const firstErrorField = Object.keys(formErrors)[0] as keyof BookReviewForm;
    if (firstErrorField) {
      setFocus(firstErrorField);
    }
  };

  const submit = handleSubmit(onSubmit, handleLogErrors);

  return (
    <Container maxWidth="xl">
      <Grid container sx={{ width: '100%', height: '100%', p: 4 }}>
        <Grid sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
          <Card sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
            <CardContent
              sx={{
                display: 'flex',
                width: '100%',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              <BookInfo />
              <Rating />
              <Quotes />
              <Visibility />
              {/* <Button
                variant="outlined"
                color="warning"
                onClick={handleLogErrors}
                sx={{ mt: 2, alignSelf: 'flex-start' }}
              >
                <Typography variant="caption">🔍 폼 에러 로그 출력</Typography>
              </Button> */}
            </CardContent>
          </Card>
          {isPreviewAvailable && <Preview />}
        </Grid>

        <Box
          sx={[
            {
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'end',
              flexGrow: 1,
              gap: 2,
              mt: 4,
            },
            { justifyContent: 'flex-end' },
          ]}
        >
          <Button
            variant="contained"
            endIcon={<ChevronRightRoundedIcon />}
            onClick={submit}
            sx={{ width: 'fit-content' }}
          >
            완료
          </Button>
        </Box>
      </Grid>
    </Container>
  );
}
