import { cn } from '../lib/cn';

type SpinnerSize = 'sm' | 'md' | 'lg';

export interface SpinnerProps {
  size?: SpinnerSize;
}

const sizeClasses: Record<SpinnerSize, string> = {
  sm: 'h-4 w-4 border-2',
  md: 'h-6 w-6 border-2',
  lg: 'h-10 w-10 border-[3px]',
};

export function Spinner({ size = 'md' }: SpinnerProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'inline-block rounded-full border-current border-r-transparent motion-safe:animate-spin motion-reduce:animate-none',
        sizeClasses[size]
      )}
    />
  );
}
