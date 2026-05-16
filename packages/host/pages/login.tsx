import { useRouter } from 'next/router';
import { login, useAppDispatch } from 'shared-store';
import { Button } from 'shared-ui';

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogin = () => {
    dispatch(
      login({
        user: {
          id: 1,
          name: 'Test User',
          email: 'test@test.com',
        },
        token: `mock-jwt-${Date.now()}`,
      }),
    );

    void router.push('/');
  };

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center gap-6 px-4">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-semibold text-slate-950">Login</h1>
        <p className="text-sm text-slate-600">Use the mock account for the local flow.</p>
        <p className="text-sm text-slate-500">test@test.com / password123</p>
      </div>
      <Button label="Login as Test User" onClick={handleLogin} variant="primary" />
    </main>
  );
}
