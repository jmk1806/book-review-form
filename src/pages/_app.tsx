import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { FormProvider, useForm } from 'react-hook-form';
import { BookReviewFormSchema, type BookReviewForm } from '@/types/BookReviewForm';
import { ReadingStatus } from '@/types/BookInfo';
import { zodResolver } from '@hookform/resolvers/zod';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

export default function App({ Component, pageProps }: AppProps) {
  const methods = useForm<BookReviewForm>({
    resolver: zodResolver(BookReviewFormSchema),
    mode: 'onSubmit',
    defaultValues: {
      title: '',
      author: '',
      totalPages: 0,
      status: ReadingStatus.WISH_TO_READ,
      rating: 0,
      comment: '',
      quotes: [],
      recommend: false,
      visibility: true,
      publishDate: new Date(),
    },
  });

  // zodResolver 테스트
  console.log('🔍 useForm 초기화됨');
  console.log('🔍 methods.formState.errors:', methods.formState.errors);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <FormProvider {...methods}>
            <main className="app">
              <Component {...pageProps} />
            </main>
          </FormProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
