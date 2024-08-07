import React from 'react';
import type { AppProps } from 'next/app';
import Layout from 'src/components/Layout/Layout';
import { wrapper } from 'src/store/store';
import { MainPageProps } from 'src/lib/types';
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
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ErrorBoundary>
  );
}

export default wrapper.withRedux(App);
