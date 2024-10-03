import { Head } from '@inertiajs/react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout(props: AuthLayoutProps) {
  return (
    <>
      <Head title="Login" />
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        {props.children}
      </div>
    </>
  );
}
