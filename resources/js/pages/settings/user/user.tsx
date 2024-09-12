import { Head, usePage } from '@inertiajs/react';
// layouts
import DashboardLayout from '@/layouts/main';
// global components
import { DataTable } from '@/components/datatable/datatable';
import { Button } from '@/components/ui/button';
// local components
import { columns } from './columns';

export default function UserPage() {
  // constants
  const { users } = usePage<any>().props;

  return (
    <>
      <Head title="Users" />
      <DashboardLayout
        pageTitle={'User Accounts'}
        pageDescription={'Registered Accounts in the system.'}
        pageAction={<Button>Create New User</Button>}
      >
        <DataTable
          columns={columns}
          links={users.links}
          meta={users.meta}
          data={users.data}
        />
      </DashboardLayout>
    </>
  );
}
