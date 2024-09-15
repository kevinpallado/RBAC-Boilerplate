import { Head, usePage } from '@inertiajs/react';
// layouts
import DashboardLayout from '@/layouts/main';
// global components
import { DataTable } from '@/components/datatable/datatable';
// plugin
import { ColumnDef } from '@tanstack/react-table';

type UserGroup = {
  id: string;
  name: string;
  email: string;
  created_at: string;
};

export default function UserGroupPage() {
  // constants
  const { usergroup } = usePage<any>().props;

  const columns: ColumnDef<UserGroup>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'updated_at',
      header: 'Date Last Updated',
      cell: ({ row }) => {
        const data = new Date(row.getValue('updated_at'));
        const formatted = data.toLocaleDateString();
        return <div className="font-medium">{formatted}</div>;
      },
    },
  ];

  return (
    <>
      <Head title="User Group" />
      <DashboardLayout
        pageTitle={'User Groups'}
        pageDescription={'Account groups within the system.'}
      >
        <DataTable
          columns={columns}
          links={usergroup.links}
          meta={usergroup.meta}
          data={usergroup.data}
        />
      </DashboardLayout>
    </>
  );
}
