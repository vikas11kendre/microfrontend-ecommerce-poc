import { Spinner } from 'shared-ui';

import { ErrorBoundary } from '../components/ErrorBoundary';
import { RemoteError } from '../components/RemoteError';
import { createRemoteComponent } from '../lib/loadRemoteComponent';

const OrdersPage = createRemoteComponent(
  'remoteOrders/OrdersPage',
  () => (
    <div className="flex min-h-[40vh] items-center justify-center">
      <Spinner size="lg" />
    </div>
  ),
);

export default function OrdersRoute() {
  return (
    <ErrorBoundary fallback={({ retry }) => <RemoteError name="Orders" onRetry={retry} />}>
      <OrdersPage />
    </ErrorBoundary>
  );
}
