import { Link, usePage } from '@inertiajs/react';

import { SidebarNavItem } from '@/types';
import { cn, userHasAccess, userHasModuleAccess } from '@/utils';
import { useLockBody } from '@/hooks/use-lock-body';
import { Icons } from '@/components/icons';

interface MobileNavProps {
  items: SidebarNavItem[];
  children?: React.ReactNode;
}

export function MobileNav({ items, children }: MobileNavProps) {
  const { auth } = usePage<any>().props;
  useLockBody();

  function renderLinkItem(
    pageIndex: number,
    disabled: boolean | undefined | null,
    href: string,
    title: string,
    pathKey: string
  ) {
    return (
      <Link
        key={pageIndex}
        href={disabled ? '/' : href}
        className={cn(
          'flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline',
          disabled && 'cursor-not-allowed opacity-60'
        )}
      >
        {title}
      </Link>
    );
  }
  return (
    <div
      className={cn(
        'fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-bottom-80 lg:hidden'
      )}
    >
      <div className="relative z-20 grid gap-6 rounded-md bg-popover p-4 text-popover-foreground shadow-md">
        <Link href="/" className="flex items-center space-x-2">
          <Icons.logo />
          <span className="font-bold">Sample Test Navigation</span>
        </Link>
        <nav className="grid grid-flow-row auto-rows-max text-sm">
          {items.map((mainnav: any, index) => {
            return mainnav.module &&
              userHasModuleAccess(mainnav.slug, auth.modules) ? (
              <div key={index}>
                <p key={index} className="py-2 text-sm tracking-tight">
                  {mainnav.title}
                </p>
                {mainnav.pages.length > 0 &&
                  mainnav.pages.map(
                    (page: any, pageIndex: number) =>
                      userHasAccess(page.slug, auth.access) &&
                      page.href &&
                      renderLinkItem(
                        pageIndex,
                        page.disabled,
                        page.href,
                        page.title,
                        page.pathKey
                      )
                  )}
              </div>
            ) : (
              userHasAccess(mainnav.slug, auth.access) &&
                mainnav.href &&
                renderLinkItem(
                  index,
                  mainnav.disabled,
                  mainnav.href,
                  mainnav.title,
                  mainnav.pathKey
                )
            );
          })}
        </nav>
        {children}
      </div>
    </div>
  );
}
