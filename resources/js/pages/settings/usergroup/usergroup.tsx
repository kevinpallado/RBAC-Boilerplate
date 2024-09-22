import { router, usePage, useForm } from '@inertiajs/react';
// layouts
import DashboardLayout from '@/layouts/main';
// global components
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ColumnMenu } from '@/components/datatable/column-menu';
import { DataTable } from '@/components/datatable/datatable';
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
// hooks
import { useBoolean } from '@/hooks/use-boolean';
// local components
import UserGroupForm from './forms/usergroup-form';
// plugin
import { ColumnDef } from '@tanstack/react-table';
import { useState } from 'react';

type UserGroup = {
  id: string;
  name: string;
  email: string;
  removable: boolean;
  updated_at: string;
};

export default function UserGroupPage() {
  // constants
  const { _action, usergroup } = usePage<any>().props;
  const [selectedUserGroup, setSelectedUserGroup] = useState<any>({});
  // modal form
  const formDialog = useBoolean(false);
  const userGroupForm = useForm({
    name: '',
  });

  const submitUserGroupForm = (e: any) => {
    e.preventDefault();

    selectedUserGroup.id
      ? userGroupForm.put(
          route('system-settings.user-group.update', selectedUserGroup.id),
          {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (success: any) => {
              formDialog.onFalse();
              toast.success(success.props.notification.message);
            },
            onError: (errors: any) => {
              toast.error('Something went wrong. Check form');
            },
          }
        )
      : userGroupForm.post(route('system-settings.user-group.store'), {
          preserveScroll: true,
          preserveState: true,
          onSuccess: (success: any) => {
            formDialog.onFalse();
            toast.success(success.props.notification.message);
          },
          onError: (errors: any) => {
            toast.error('Something went wrong. Check form');
          },
        });
  };
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
          <Badge variant={row.original.removable ? 'destructive' : 'default'}>
            {row.original.removable ? 'Removable' : 'Default'}
          </Badge>
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
              disabled={!_action.find((action: string) => action === 'update')}
              onClick={(e) =>
                router.visit(route('system-settings.user-group.edit', group.id))
              }
            >
              Group Access
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={(e) => {
                formDialog.onTrue();
                setSelectedUserGroup(group);
                userGroupForm.setData({
                  ...userGroupForm.data,
                  ...{
                    name: group.name,
                    action: 'group-detail',
                  },
                });
              }}
              disabled={
                !row.original.removable ||
                !_action.find((action: string) => action === 'update')
              }
            >
              Edit User Group
            </DropdownMenuItem>
          </ColumnMenu>
        );
      },
    },
  ];

  return (
    <DashboardLayout
      pageTitle={'User Groups'}
      pageDescription={'Account groups within the system.'}
      pageAction={
        <Button
          onClick={(e) => {
            userGroupForm.reset();
            formDialog.onTrue();
          }}
          disabled={!_action.find((action: string) => action === 'store')}
        >
          Create New User Group
        </Button>
      }
    >
      <UserGroupForm
        open={formDialog.value}
        openToggle={formDialog.onToggle}
        userGroupForm={userGroupForm}
        userGroupFormSubmit={submitUserGroupForm}
      />
      <DataTable
        columns={columns}
        links={usergroup.links}
        meta={usergroup.meta}
        data={usergroup.data}
      />
    </DashboardLayout>
  );
}
