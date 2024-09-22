'use client';

import { Link, usePage } from '@inertiajs/react';

import { SidebarNavItem } from '@/types';
import { cn, userHasAccess, userHasModuleAccess } from '@/utils';
import { Icons } from '@/components/icons';

interface SidebarNavigationProps {
  items: SidebarNavItem[];
}

export function SidebarNavigation({ items }: SidebarNavigationProps) {
  const { auth } = usePage<any>().props;

  if (!items?.length) {
    return null;
  }

  function renderLinkItem(
    pageIndex: number,
    disabled: boolean | undefined | null,
    href: string,
    title: string,
    pathKey: string,
    icon: keyof typeof Icons
  ) {
    const Icon = Icons[icon || 'arrowRight'];
    return (
      <Link key={pageIndex} href={disabled ? '/' : href}>
        <span
          className={cn(
            'group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
            route().current(pathKey) ? 'bg-accent' : 'transparent'
          )}
        >
          <Icon className="mr-2 h-4 w-4" />
          <span>{title}</span>
        </span>
      </Link>
    );
  }

  return (
    <nav className="grid items-start gap-2">
      {items.map((mainnav: any, index) => {
        return mainnav.module &&
          userHasModuleAccess(mainnav.slug, auth.modules) ? (
          <div key={index}>
            <p key={index} className="px-4 py-2 text-sm tracking-tight">
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
                    page.pathKey,
                    page.icon
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
              mainnav.pathKey,
              mainnav.icon
            )
        );
      })}
    </nav>
  );
}
