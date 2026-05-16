import { useState } from 'react';

interface WarningBannerProps {
  message: string;
  onDismiss?: () => void;
}

export function WarningBanner({ message, onDismiss }: WarningBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const handleDismiss = () => {
    setDismissed(true);
    onDismiss?.();
  };

  return (
    <div className="sticky top-0 z-50 w-full bg-yellow-100 px-4 py-2 text-center text-sm text-yellow-800">
      <span>{message}</span>
      <button
        onClick={handleDismiss}
        className="ml-4 font-semibold underline hover:text-yellow-900"
        aria-label="Dismiss warning"
      >
        Dismiss
      </button>
    </div>
  );
}
