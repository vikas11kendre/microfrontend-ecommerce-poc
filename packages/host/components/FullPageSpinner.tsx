import { Spinner } from 'shared-ui';

export function FullPageSpinner() {
  return (
    <div
      className="flex min-h-screen items-center justify-center"
      aria-label="Loading"
      role="status"
    >
      <Spinner size="lg" />
    </div>
  );
}
