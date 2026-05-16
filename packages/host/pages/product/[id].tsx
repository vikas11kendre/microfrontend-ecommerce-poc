import { Spinner } from 'shared-ui';

import { ErrorBoundary } from '../../components/ErrorBoundary';
import { RemoteError } from '../../components/RemoteError';
import { createRemoteComponent } from '../../lib/loadRemoteComponent';

const ProductDetailPage = createRemoteComponent(
  'remoteProducts/ProductDetailPage',
  () => (
    <div className="flex min-h-[40vh] items-center justify-center">
      <Spinner size="lg" />
    </div>
  ),
);

export default function ProductDetailRoute() {
  return (
    <ErrorBoundary fallback={({ retry }) => <RemoteError name="Product detail" onRetry={retry} />}>
      <ProductDetailPage />
    </ErrorBoundary>
  );
}
