import { Box, Button, Container, Typography } from '@mui/material';
import { useRouter } from 'next/router';

export default function MainPage() {
  const router = useRouter();
  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          display: 'flex',
          my: 4,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          gap: 6,
        }}
      >
        <Typography variant="h4">독후감 작성하기</Typography>
        <Typography variant="body1">나만의 작은 독후감 만들기</Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => {
            router.push('/review');
          }}
        >
          독후감 작성하기
        </Button>
      </Box>
    </Container>
  );
}
