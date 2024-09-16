import { usePage, router } from '@inertiajs/react';
// layouts
import DashboardLayout from '@/layouts/main';
// global components
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ConfirmationDialog } from '@/components/form/confirmation-dialog';
import { Label } from '@/components/ui/label';
// package
import { useCallback, useState } from 'react';
import { toast } from 'sonner';
// hooks
import { useBoolean } from '@/hooks/use-boolean';

export default function UserGroupAccessListsPage() {
  const { access, userGroup, actions, pages } = usePage<any>().props;
  const confirmDialog = useBoolean(false);
  const [groupAccess, setGroupAccess] = useState<any[]>(access);
  const applyAccess = useCallback(
    (checked: boolean, pageId: number, action: string) => {
      if (checked) {
        setGroupAccess((prevData: any) => [
          ...prevData,
          {
            page_id: pageId,
            action: action,
            access_type: 'group',
            access_id: userGroup.id,
          },
        ]);
      } else {
        setGroupAccess((accessData) =>
          accessData.filter(
            (item) => !(item.page_id === pageId && item.action === action)
          )
        );
      }
    },
    []
  );
  const isAccessChecked = (pageId: number, action: string) => {
    return groupAccess.find(
      (access: any) => access.page_id === pageId && access.action === action
    )
      ? true
      : false;
  };
  const submitAccess = (e: any) => {
    router.put(
      route('system-settings.user-group.update', userGroup.id),
      {
        groupAccess: groupAccess,
        action: 'group-access',
      },
      {
        preserveScroll: true,
        preserveState: true,
        onSuccess: (success: any) => {
          toast.success(success.props.notification.message);
        },
        onError: (errors: any) => {
          toast.error('Something went wrong. Check form');
        },
      }
    );
  };
  return (
    <>
      <DashboardLayout
        pageTitle={'User Groups'}
        pageDescription={'List of Modules/Actions and User Group`s Access'}
        pageAction={
          <Button onClick={(e) => confirmDialog.onTrue()}>Save Access</Button>
        }
      >
        <ConfirmationDialog
          description="Are you sure you want to remove this user?"
          open={confirmDialog.value}
          openChange={confirmDialog.onToggle}
          formFn={submitAccess}
        />
        {Object.keys(pages).map((moduleSlug) => {
          const module = pages[moduleSlug];
          return (
            <div className="px-8" key={moduleSlug}>
              <h1>{module.module}</h1>
              {module.pages.map((page: any) => (
                <div key={page.page} className="gap-4 my-2">
                  <Label>{page.page}</Label>
                  <div className="grid grid-cols-5 my-2">
                    {actions.map((action: any) => (
                      <div
                        className="flex items-center space-x-2"
                        key={action.id}
                      >
                        <Checkbox
                          id={`${page.id}_${action.slug}`}
                          checked={isAccessChecked(page.id, action.slug)}
                          onCheckedChange={(e: any) => {
                            applyAccess(e, page.id, action.slug);
                          }}
                        />
                        <Label htmlFor={`${page.id}_${action.slug}`}>
                          {action.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </DashboardLayout>
    </>
  );
}
