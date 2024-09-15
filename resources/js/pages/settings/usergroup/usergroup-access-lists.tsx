import { Head, usePage } from '@inertiajs/react';
// layouts
import DashboardLayout from '@/layouts/main';

export default function UserGroupAccessListsPage() {
  const { pages } = usePage<any>().props;
  return (
    <>
      <Head title="User Group" />
      <DashboardLayout
        pageTitle={'User Groups'}
        pageDescription={'List of Modules/Actions and User Group`s Access'}
      >
        {Object.keys(pages).map((moduleSlug) => {
          const module = pages[moduleSlug];
          return (
            <div key={moduleSlug}>
              <h1>{module.module}</h1>
            </div>
          );
        })}
      </DashboardLayout>
    </>
  );
}
