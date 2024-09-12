import { router, usePage } from '@inertiajs/react';
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
    <DashboardLayout
      pageTitle={'User Accounts'}
      pageDescription={'Registered Accounts in the system.'}
      pageAction={
        <Button
          onClick={(e) => router.get(route('system-settings.users.create'))}
        >
          Create New User
        </Button>
      }
    >
      <DataTable
        columns={columns}
        links={users.links}
        meta={users.meta}
        data={users.data}
      />
    </DashboardLayout>
  );
}
