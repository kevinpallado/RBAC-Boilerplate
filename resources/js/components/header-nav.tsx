import * as React from 'react';

import { SidebarNavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Icons } from '@/components/icons';
import { MobileNav } from '@/components/mobile-nav';

interface HeaderNavigationProps {
  items?: SidebarNavItem[];
  children?: React.ReactNode;
}

export function HeaderNavigation({ items, children }: HeaderNavigationProps) {
  const { title } = usePage<any>().props;
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);

  return (
    <div className="flex gap-6 md:gap-10">
      <Link
        href={route('dashboard')}
        className="hidden items-center space-x-2 lg:flex"
      >
        <img src="/assets/logo.svg" alt={title} />
        <span className="hidden font-bold sm:inline-block">{title}</span>
      </Link>
      <button
        className="flex items-center space-x-2 lg:hidden"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        {showMobileMenu ? (
          <Icons.close />
        ) : (
          <img src="/assets/logo.svg" alt={title} />
        )}
        <span className="font-bold">{title}</span>
      </button>
      {showMobileMenu && items && (
        <MobileNav items={items} title={title}>
          {children}
        </MobileNav>
      )}
    </div>
  );
}
