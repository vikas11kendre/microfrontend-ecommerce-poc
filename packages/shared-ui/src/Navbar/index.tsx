import type { ReactNode } from 'react';
import { useState } from 'react';

import { Badge } from '../Badge';
import { Button } from '../Button';
import { cn } from '../lib/cn';

export interface NavbarProps {
  cartDropdown?: ReactNode;
  cartCount?: number;
  isAuthenticated?: boolean;
  onLoginClick?: () => void;
  onLogoutClick?: () => void;
  cartHref?: string;
  brandHref?: string;
  brandLabel?: string;
  currentPath?: string;
}

export function Navbar({
  cartDropdown,
  cartCount = 0,
  isAuthenticated = false,
  onLoginClick,
  onLogoutClick,
  cartHref = '/cart',
  brandHref = '/',
  brandLabel = 'MFE Commerce',
  currentPath,
}: NavbarProps) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartIsCurrent = currentPath === cartHref;

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <a href={brandHref} className="text-lg font-semibold tracking-tight text-slate-950">
          {brandLabel}
        </a>
        <div className="flex items-center gap-3">
          {cartDropdown ? (
            <div className="relative">
              <button
                type="button"
                aria-expanded={isCartOpen}
                aria-haspopup="dialog"
                className={cn(
                  'relative inline-flex items-center rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-800 transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2',
                  cartIsCurrent && 'border-slate-900'
                )}
                onClick={() => setIsCartOpen((open) => !open)}
              >
                <span>Cart</span>
                <Badge count={cartCount} />
              </button>
              {isCartOpen ? (
                <div className="absolute right-0 top-full z-20 mt-2 w-80 rounded-xl border border-slate-200 bg-white p-4 shadow-lg">
                  {cartDropdown}
                </div>
              ) : null}
            </div>
          ) : (
            <a
              href={cartHref}
              className={cn(
                'relative inline-flex items-center gap-2 rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-800 transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2',
                cartIsCurrent && 'border-slate-900'
              )}
            >
              <span>Cart</span>
              <Badge count={cartCount} />
            </a>
          )}
          {isAuthenticated ? (
            <Button label="Logout" variant="ghost" onClick={onLogoutClick ?? (() => undefined)} />
          ) : (
            <Button label="Login" variant="secondary" onClick={onLoginClick ?? (() => undefined)} />
          )}
        </div>
      </div>
    </header>
  );
}
