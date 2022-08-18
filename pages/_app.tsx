import '../styles/globals.css';

import { store } from 'app/store/store.app';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
