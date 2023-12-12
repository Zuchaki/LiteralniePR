import '@/styles/globals.css';

import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import { QueryClientProvider } from 'react-query';

import queryClient from '@/config/queryClient';
import { toastConfig } from '@/config/toasterConfig';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <Toaster toastOptions={toastConfig} />
    </QueryClientProvider>
  );
}
