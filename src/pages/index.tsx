import Head from 'next/head';
import MainPage from '@/screens/MainPage';

export default function Home() {
  return (
    <>
      <Head>
        <title>독후감 작성하기</title>
        <meta name="description" content="독후감 작성하기" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainPage />
    </>
  );
}
