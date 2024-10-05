import { Link, usePage } from '@inertiajs/react';

import { SidebarNavItem } from '@/types';
import { cn, userHasAccess, userHasModuleAccess } from '@/utils';
import { useLockBody } from '@/hooks/use-lock-body';

// global components
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface MobileNavProps {
  title: string;
  items: SidebarNavItem[];
  showMobileMenu?: boolean;
  setShowMobileMenu?: any;
  defaultAccess?: boolean;
}

export function MobileNav({
  title,
  items,
  showMobileMenu,
  setShowMobileMenu,
  defaultAccess,
}: MobileNavProps) {
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
    <Sheet open={showMobileMenu} onOpenChange={setShowMobileMenu}>
      <SheetTrigger asChild></SheetTrigger>
      <SheetContent side="left">
        <Link href="/" className="flex items-center space-x-2">
          <img className="w-14" src="/assets/logo.svg" alt={title} />
          <span className="font-bold">{title}</span>
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
              userHasAccess(mainnav.slug, auth.access, defaultAccess) &&
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
      </SheetContent>
    </Sheet>
  );
}
