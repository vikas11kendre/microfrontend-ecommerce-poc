import { useRouter } from 'next/router';
import { Spinner } from 'shared-ui';
import type { ReactNode } from 'react';
import { logout, useAppDispatch, useAppSelector } from 'shared-store';
import { Navbar } from 'shared-ui';

import { createRemoteComponent } from '../lib/loadRemoteComponent';

const CartSummary = createRemoteComponent(
  'remoteCart/CartSummary',
  () => (
    <div className="flex min-h-24 items-center justify-center">
      <Spinner size="md" />
    </div>
  ),
);

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const cartCount = useAppSelector((s) => s.cart.totalCount);
  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);

  return (
    <>
      <Navbar
        cartDropdown={<CartSummary />}
        cartCount={cartCount}
        isAuthenticated={isAuthenticated}
        currentPath={router.pathname}
        onLoginClick={() => router.push('/login')}
        onLogoutClick={() => dispatch(logout())}
      />
      <main>{children}</main>
    </>
  );
}
