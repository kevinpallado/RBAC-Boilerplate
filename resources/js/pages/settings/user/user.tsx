import { useState, useCallback } from 'react';
import { router, usePage } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
// layouts
import DashboardLayout from '@/layouts/main';
// global components
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ConfirmationDialog } from '@/components/form/confirmation-dialog';
import { ColumnMenu } from '@/components/datatable/column-menu';
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { DataTable } from '@/components/datatable/datatable';
import { toast } from 'sonner';
// hooks
import { useBoolean } from '@/hooks/use-boolean';
import useTableUpdate from '@/hooks/use-update';
// local components
import Toolbar from './toolbar';

type UserGroup = {
  id: number;
  name: string;
};

type User = {
  id: number;
  name: string;
  email: string;
  created_at: string;
  user_group: UserGroup;
};

export default function UserPage() {
  // constants
  const { users } = usePage<any>().props;
  const confirmDialog = useBoolean(false);
  const [columnId, setColumnId] = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [filterSearch, setFilterSearch] = useState<string | null>(null);
  // datatable information
  const [currentPage, setCurrentPage] = useState(users.meta.current_page - 1);
  const links = users.meta.links.filter(
    (_: any, index: any) => ![0, users.links.length - 1].includes(index)
  );
  // function to delete/archive user
  const submitAction = (e: any) => {
    router.delete(route('system-settings.users.destroy', columnId), {
      preserveScroll: true,
      preserveState: true,
      onSuccess: (success: any) => {
        toast.success(success.props.notification.message);
      },
      onError: (errors: any) => {
        toast.error('Something went wrong. Check form');
      },
    });
  };

  const handleFilterSearch = useCallback((e: any) => {
    setFilterSearch(e.target.value);
  }, []);

  useTableUpdate(() => {
    let querySearch = filterSearch ? { search: filterSearch } : {};
    router.get(
      links[currentPage].url,
      {
        ...querySearch,
      },
      {
        preserveScroll: true,
        preserveState: true,
        onSuccess: (success: any) => console.log('Success Query'),
        onError: (errors: any) => console.log(errors),
      }
    );
  }, [filterSearch, filterStatus]);

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'user_group',
      header: () => <div className="text-center">User Role</div>,
      cell: ({ row }) => (
        <div className="text-center">
          <Badge>{row.original.user_group.name}</Badge>
        </div>
      ),
    },
    {
      accessorKey: 'last_logged_in',
      header: 'Last Logged In',
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const user = row.original;
        return (
          <ColumnMenu>
            <DropdownMenuItem>Custom User Access</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={(e: any) =>
                router.visit(route('system-settings.users.edit', user.id))
              }
            >
              Edit Account Details
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e: any) => {
                confirmDialog.onTrue();
                setColumnId(user.id);
              }}
            >
              Remove User
            </DropdownMenuItem>
          </ColumnMenu>
        );
      },
    },
  ];

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
      <Toolbar searchValue={filterSearch} searchOnChange={handleFilterSearch} />
      <DataTable
        columns={columns}
        links={users.links}
        meta={users.meta}
        data={users.data}
      />
      <ConfirmationDialog
        description="Are you sure you want to remove this user?"
        open={confirmDialog.value}
        openChange={confirmDialog.onToggle}
        formFn={submitAction}
      />
    </DashboardLayout>
  );
}
