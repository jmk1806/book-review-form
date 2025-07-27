import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { FormProvider, useForm } from 'react-hook-form';
import { BookReviewFormSchema, type BookReviewForm } from '@/types/BookReviewForm';
import { ReadingStatus } from '@/types/BookInfo';
import { zodResolver } from '@hookform/resolvers/zod';

const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

export default function App({ Component, pageProps }: AppProps) {
  const methods = useForm<BookReviewForm>({
    resolver: zodResolver(BookReviewFormSchema),
    defaultValues: {
      title: '',
      author: '',
      totalPages: 0,
      status: ReadingStatus.WISH_TO_READ,
      startDate: new Date(),
      endDate: new Date(),
      rating: 0,
      comment: '',
      quotes: [],
      recommend: false,
      visibility: true,
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <FormProvider {...methods}>
          <main className="app">
            <Component {...pageProps} />
          </main>
        </FormProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
