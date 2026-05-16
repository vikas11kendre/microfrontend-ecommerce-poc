import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from 'shared-store';

import Layout from '../components/Layout';
import '../styles/globals.css';

function RemoteProductsAppShell({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PersistGate>
    </ReduxProvider>
  );
}

const ClientRemoteProductsAppShell = dynamic(
  () => Promise.resolve(RemoteProductsAppShell),
  {
    ssr: false,
    loading: () => <main className="min-h-screen" />,
  },
);

function App(props: AppProps) {
  return <ClientRemoteProductsAppShell {...props} />;
}

App.getInitialProps = async () => ({ pageProps: {} });

export default App;
