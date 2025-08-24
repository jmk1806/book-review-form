import Head from 'next/head';
import ReviewPage from '@/screens/ReviewPage';
import { BookReviewFormSchema, type BookReviewForm } from '@/types/BookReviewForm';
import { ReadingStatus } from '@/types/BookInfo';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';

export default function Page() {
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
      quotes: [
        {
          page: 0,
          text: '',
        },
      ],
      recommend: false,
      visibility: true,
      publishDate: new Date(),
    },
  });
  return (
    <>
      <Head>
        <title>독후감 작성하기</title>
        <meta name="description" content="독후감 작성하기" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FormProvider {...methods}>
        <ReviewPage />
      </FormProvider>
    </>
  );
}
