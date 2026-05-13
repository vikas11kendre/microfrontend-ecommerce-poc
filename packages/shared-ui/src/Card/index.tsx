import type { ReactNode } from 'react';

import { cn } from '../lib/cn';

export interface CardProps {
  title: string;
  description?: string;
  image?: string;
  footer?: ReactNode;
  onClick?: () => void;
}

export function Card({ title, description, image, footer, onClick }: CardProps) {
  const clickable = typeof onClick === 'function';

  return (
    <article
      className={cn(
        'overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm',
        clickable && 'cursor-pointer transition-shadow hover:shadow-md'
      )}
      onClick={onClick}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
    >
      {image ? <img src={image} alt={title} className="h-48 w-full object-cover" /> : null}
      <div className="space-y-2 p-4">
        <h3 className="text-base font-semibold text-slate-900">{title}</h3>
        {description ? <p className="text-sm leading-6 text-slate-600">{description}</p> : null}
      </div>
      {footer ? <div className="border-t border-slate-100 p-4">{footer}</div> : null}
    </article>
  );
}
