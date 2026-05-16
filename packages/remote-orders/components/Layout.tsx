import { useRouter } from 'next/router';
import type { ReactNode } from 'react';
import { logout, useAppDispatch, useAppSelector } from 'shared-store';
import { Navbar } from 'shared-ui';

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const cartCount = useAppSelector((s) => s.cart.totalCount);
  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);

  return (
    <>
      <Navbar
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
