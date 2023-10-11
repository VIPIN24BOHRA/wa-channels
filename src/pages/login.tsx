import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/authContext';

export default function Login() {
  const authContext: any = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (authContext.isLoggedIn && router.isReady) {
      router.replace('/');
    }
  }, [authContext.isLoggedIn, router]);

  const handleLogin = async () => {
    await authContext.login();
  };
  return (
    <>
      <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="bg-muted relative hidden h-full flex-col p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />

          <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6 "
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            WA Channel
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Sign In</h1>
              <p className="text-muted-foreground text-sm">
                Choose your email and login to create and manage Whatsapp
                channel.
              </p>
            </div>
            <>
              <div className={'grid gap-6'}>
                <Button onClick={handleLogin}>Sign In with Google</Button>
              </div>
            </>
            <p className="text-muted-foreground px-8 text-center text-sm">
              By clicking continue, you agree to our{' '}
              <Link
                href="/terms"
                className="hover:text-primary underline underline-offset-4"
              >
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link
                href="/privacy"
                className="hover:text-primary underline underline-offset-4"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
