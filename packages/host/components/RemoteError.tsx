import { Button } from 'shared-ui';

interface RemoteErrorProps {
  name: string;
  onRetry: () => void;
}

export function RemoteError({ name, onRetry }: RemoteErrorProps) {
  return (
    <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
      <h2 className="mb-2 text-lg font-semibold text-red-800">
        This section is temporarily unavailable
      </h2>
      <p className="mb-4 text-sm text-red-700">
        {name} remote failed to load. You can try again or navigate elsewhere.
      </p>
      <Button label="Retry" onClick={onRetry} variant="primary" />
    </div>
  );
}
