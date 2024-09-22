import * as React from 'react';

import { SidebarNavItem } from '@/types';
import { cn } from '@/utils';
import { Link } from '@inertiajs/react';
import { Icons } from '@/components/icons';
import { MobileNav } from '@/components/mobile-nav';

interface HeaderNavigationProps {
  items?: SidebarNavItem[];
  children?: React.ReactNode;
}

export function HeaderNavigation({ items, children }: HeaderNavigationProps) {
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);

  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="hidden items-center space-x-2 lg:flex">
        <Icons.logo />
        <span className="hidden font-bold sm:inline-block">
          Sample Navigation
        </span>
      </Link>
      <button
        className="flex items-center space-x-2 lg:hidden"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        {showMobileMenu ? <Icons.close /> : <Icons.logo />}
        <span className="font-bold">Sample Navigation</span>
      </button>
      {showMobileMenu && items && (
        <MobileNav items={items}>{children}</MobileNav>
      )}
    </div>
  );
}
