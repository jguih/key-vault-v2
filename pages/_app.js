import React from 'react';
import { SSRProvider } from 'react-bootstrap';
import '../scss/global.scss';
import ErrorBoundary from "./ErrorBoundary";

function MyApp({ Component, pageProps }) {
  return (
    <ErrorBoundary>
      <SSRProvider>
        <Component {...pageProps} />
      </SSRProvider>
    </ErrorBoundary>
  );
}

export default MyApp
