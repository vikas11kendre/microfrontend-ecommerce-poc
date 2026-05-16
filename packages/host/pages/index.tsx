import { Spinner } from 'shared-ui';

import { ErrorBoundary } from '../components/ErrorBoundary';
import { RemoteError } from '../components/RemoteError';
import { createRemoteComponent } from '../lib/loadRemoteComponent';

const ProductsPage = createRemoteComponent(
  'remoteProducts/ProductsPage',
  () => (
    <div className="flex min-h-[40vh] items-center justify-center">
      <Spinner size="lg" />
    </div>
  ),
);

export default function Home() {
  return (
    <ErrorBoundary fallback={({ retry }) => <RemoteError name="Products" onRetry={retry} />}>
      <ProductsPage />
    </ErrorBoundary>
  );
}
