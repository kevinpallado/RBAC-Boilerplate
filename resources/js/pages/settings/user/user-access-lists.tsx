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

export default function UserAccessListsPage() {
  const { access, user, actions, pages } = usePage<any>().props;
  const confirmDialog = useBoolean(false);
  const [userAccess, setUserAccess] = useState<any[]>(access);
  const applyAccess = useCallback(
    (checked: boolean, pageId: number, action: string) => {
      if (checked) {
        setUserAccess((prevData: any) => [
          ...prevData,
          {
            page_id: pageId,
            action: action,
            access_type: 'user',
            access_id: user.id,
          },
        ]);
      } else {
        setUserAccess((accessData) =>
          accessData.filter(
            (item) => !(item.page_id === pageId && item.action === action)
          )
        );
      }
    },
    []
  );
  const isAccessChecked = (pageId: number, action: string) => {
    let accessFind = userAccess.find(
      (access: any) => access.page_id === pageId && access.action === action
    );
    return {
      actionAccess: accessFind ? true : false,
      isGroupAccess: accessFind
        ? accessFind.access_type === 'group'
          ? true
          : false
        : false,
    };
  };
  const submitAccess = (e: any) => {
    router.put(
      route('system-settings.users.update', user.id),
      {
        userAccess: userAccess,
        action: 'user-access',
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
        pageTitle={'System User Access'}
        pageDescription={'List of Modules/Actions and User`s Access'}
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
                    {actions.map((action: any) => {
                      let checkAccess = isAccessChecked(page.id, action.slug);
                      return (
                        <div
                          className="flex items-center space-x-2"
                          key={action.id}
                        >
                          <Checkbox
                            id={`${page.id}_${action.slug}`}
                            checked={checkAccess.actionAccess}
                            disabled={checkAccess.isGroupAccess}
                            onCheckedChange={(e: any) => {
                              applyAccess(e, page.id, action.slug);
                            }}
                          />
                          <Label htmlFor={`${page.id}_${action.slug}`}>
                            {action.name}
                          </Label>
                        </div>
                      );
                    })}
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
