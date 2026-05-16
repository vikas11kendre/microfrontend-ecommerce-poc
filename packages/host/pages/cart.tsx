import { Spinner } from 'shared-ui';

import { ErrorBoundary } from '../components/ErrorBoundary';
import { RemoteError } from '../components/RemoteError';
import { createRemoteComponent } from '../lib/loadRemoteComponent';

const CartPage = createRemoteComponent(
  'remoteCart/CartPage',
  () => (
    <div className="flex min-h-[40vh] items-center justify-center">
      <Spinner size="lg" />
    </div>
  ),
);

export default function CartRoute() {
  return (
    <ErrorBoundary fallback={({ retry }) => <RemoteError name="Cart" onRetry={retry} />}>
      <CartPage />
    </ErrorBoundary>
  );
}
