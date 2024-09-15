import { Head, router, usePage } from '@inertiajs/react';
// layouts
import DashboardLayout from '@/layouts/main';
// global components
import { Badge } from '@/components/ui/badge';
import { ColumnMenu } from '@/components/datatable/column-menu';
import { DataTable } from '@/components/datatable/datatable';
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
// plugin
import { ColumnDef } from '@tanstack/react-table';

type UserGroup = {
  id: string;
  name: string;
  email: string;
  removable: boolean;
  updated_at: string;
};

export default function UserGroupPage() {
  // constants
  const { usergroup } = usePage<any>().props;

  const columns: ColumnDef<UserGroup>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'removable',
      header: () => <div className="text-center">Removable</div>,
      cell: ({ row }) => (
        <div className="text-center">
          <Badge>{row.original.removable ? 'Removable' : 'Default'}</Badge>
        </div>
      ),
    },
    {
      accessorKey: 'updated_at',
      header: 'Date Last Updated',
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const group = row.original;
        return (
          <ColumnMenu>
            <DropdownMenuItem
              onClick={(e) =>
                router.visit(route('system-settings.user-group.edit', group.id))
              }
            >
              Group Access
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled={!row.original.removable}>
              Edit User Group
            </DropdownMenuItem>
          </ColumnMenu>
        );
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
