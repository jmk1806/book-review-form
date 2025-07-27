import Head from 'next/head';
import { Geist, Geist_Mono } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import MainPage from '@/screens/MainPage';
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function Home() {
  return (
    <>
      <Head>
        <title>독후감 작성하기</title>
        <meta name="description" content="독후감 작성하기" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`${styles.page} ${geistSans.variable} ${geistMono.variable}`}>
        <main className={styles.main}>
          <MainPage />
        </main>
        <footer className={styles.footer}>
          Made by <a href="https://github.com/jmk1806">Jae Min Kim</a>
        </footer>
      </div>
    </>
  );
}
