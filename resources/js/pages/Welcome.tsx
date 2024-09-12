import { Link, Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import DashboardLayout from '@/layouts/main';

export default function Welcome() {
  return (
    <>
      <Head title="Welcome" />
      <DashboardLayout
        pageTitle={'Sample'}
        pageDescription={'Another sample description'}
      >
        <p>Test</p>
      </DashboardLayout>
    </>
  );
}
