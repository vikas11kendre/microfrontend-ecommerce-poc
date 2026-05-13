import type { MouseEventHandler } from 'react';

import { cn } from '../lib/cn';
import { Spinner } from '../Spinner';

type Variant = 'primary' | 'secondary' | 'ghost';

export interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: Variant;
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

const baseClasses =
  'inline-flex items-center justify-center gap-2 rounded-md border px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60';

const variantClasses: Record<Variant, string> = {
  primary:
    'border-sky-600 bg-sky-600 text-white hover:border-sky-700 hover:bg-sky-700 focus:ring-sky-500',
  secondary:
    'border-slate-300 bg-white text-slate-900 hover:bg-slate-50 focus:ring-slate-400',
  ghost: 'border-transparent bg-transparent text-slate-700 hover:bg-slate-100 focus:ring-slate-400',
};

export function Button({
  label,
  onClick,
  variant = 'primary',
  disabled = false,
  loading = false,
  type = 'button',
  className,
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (isDisabled) {
      event.preventDefault();
      return;
    }

    onClick();
  };

  return (
    <button
      type={type}
      disabled={isDisabled}
      aria-busy={loading}
      className={cn(baseClasses, variantClasses[variant], className)}
      onClick={handleClick}
    >
      {loading ? <Spinner size="sm" /> : null}
      <span>{label}</span>
    </button>
  );
}
