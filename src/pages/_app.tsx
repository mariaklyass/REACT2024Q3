import React from 'react';
import type { AppProps } from 'next/app';
import Layout from 'src/components/Layout/Layout';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import './styles.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ErrorBoundary>
  );
}
