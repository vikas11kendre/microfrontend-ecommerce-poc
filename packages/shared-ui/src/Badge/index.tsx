import { cn } from '../lib/cn';

type Variant = 'primary' | 'danger' | 'neutral';

export interface BadgeProps {
  count: number;
  variant?: Variant;
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-sky-600 text-white',
  danger: 'bg-rose-600 text-white',
  neutral: 'bg-slate-200 text-slate-800',
};

export function Badge({ count, variant = 'primary' }: BadgeProps) {
  if (count === 0) {
    return null;
  }

  const displayValue = count > 99 ? '99+' : String(count);

  return (
    <span
      className={cn(
        'inline-flex min-w-5 items-center justify-center rounded-full px-1.5 py-0.5 text-xs font-semibold',
        variantClasses[variant]
      )}
      aria-label={`${count} items`}
    >
      {displayValue}
    </span>
  );
}
