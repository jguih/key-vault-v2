import { SSRProvider } from 'react-bootstrap';
import '../scss/global.scss';

function MyApp({ Component, pageProps }) {
  return (
    <SSRProvider>
      <Component {...pageProps} />
    </SSRProvider>
  );
}

export default MyApp
