import { Head, usePage } from '@inertiajs/react';
// layouts
import DashboardLayout from '@/layouts/main';
// global components
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useCallback, useState } from 'react';

export default function UserGroupAccessListsPage() {
  const { userGroup, actions, pages } = usePage<any>().props;
  const [groupAccess, setGroupAccess] = useState<any[]>([]);

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
  return (
    <>
      <Head title="User Group" />
      <DashboardLayout
        pageTitle={'User Groups'}
        pageDescription={'List of Modules/Actions and User Group`s Access'}
        pageAction={
          <Button onClick={(e) => console.log(groupAccess)}>Save Access</Button>
        }
      >
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
