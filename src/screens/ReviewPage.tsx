import { BookInfo } from '@/components/BookInfo';
import { Box, Button, Card, CardContent, Container, Grid, Typography } from '@mui/material';
import { useEffect } from 'react';
import { Rating } from '@/components/Rating';
import { Quotes } from '@/components/Quotes';
import { Visibility } from '@/components/Visibility';
import { useFormContext } from 'react-hook-form';
import type { BookReviewForm } from '@/types/BookReviewForm';
import { ReadingStatus } from '@/types/BookInfo';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

export default function ReviewPage() {
  const {
    watch,
    setValue,
    formState: { errors: formErrors },
    getValues,
    handleSubmit,
  } = useFormContext<BookReviewForm>();

  const onSubmit = () => {
    console.log('🔴 Form Values:', getValues());
  };

  const handleLogErrors = () => {
    console.log('🔴 Current Form Errors:', formErrors);
    console.log('📝 Current Form Values:', getValues());
  };

  useEffect(() => {
    switch (watch('status')) {
      case ReadingStatus.ON_HOLD:
      case ReadingStatus.READING:
        setValue('startDate', new Date());
        setValue('endDate', null as unknown as Date);
        break;
      case ReadingStatus.COMPLETED:
        setValue('endDate', new Date());
        break;
      default:
        setValue('startDate', null as unknown as Date);
        setValue('endDate', null as unknown as Date);
    }
  }, [setValue, watch]);

  const submit = handleSubmit(onSubmit, () => console.log(formErrors));

  return (
    <Container maxWidth="xl">
      <Grid container sx={{ width: '100%', height: '100%', p: 4 }}>
        <Grid sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
          <Card sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
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
              <Button
                variant="outlined"
                color="warning"
                onClick={handleLogErrors}
                sx={{ mt: 2, alignSelf: 'flex-start' }}
              >
                <Typography variant="caption">🔍 폼 에러 로그 출력</Typography>
              </Button>
            </CardContent>
          </Card>
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
