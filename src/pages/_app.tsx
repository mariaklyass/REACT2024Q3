import React from 'react';
import type { AppProps } from 'next/app';
import Layout from 'src/components/Layout/Layout';
import { MainPageProps } from 'src/lib/types';
import { ThemeProvider } from 'src/context/ThemeContext';
import { wrapper } from '../store/store';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import './styles.css';

type WrappedAppProps = AppProps & {
  pageProps: MainPageProps;
};

function App({ Component, pageProps }: WrappedAppProps) {
  return (
    <ErrorBoundary
      fallback={<div>Something went wrong. Please try again later.</div>}
    >
      <ThemeProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default wrapper.withRedux(App);
