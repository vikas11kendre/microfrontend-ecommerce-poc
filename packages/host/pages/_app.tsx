import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from 'shared-store';

import { FullPageSpinner } from '../components/FullPageSpinner';
import Layout from '../components/Layout';
import { WarningBanner } from '../components/WarningBanner';
import { bootstrapRemotes } from '../lib/manifest';
import '../styles/globals.css';

function App({ Component, pageProps }: AppProps) {
  const [isClient, setIsClient] = useState(false);
  const [ready, setReady] = useState(false);
  const [usedCache, setUsedCache] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    bootstrapRemotes().then(({ usedCache }) => {
      setUsedCache(usedCache);
      setReady(true);
    });
  }, [isClient]);

  if (!isClient || !ready) {
    return <FullPageSpinner />;
  }

  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {usedCache && (
          <WarningBanner message="Using cached remote configuration. Some features may be outdated." />
        )}
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PersistGate>
    </ReduxProvider>
  );
}

App.getInitialProps = async () => ({ pageProps: {} });

export default App;
