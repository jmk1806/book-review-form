import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <main className="app">
            <Component {...pageProps} />
          </main>
        </LocalizationProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
