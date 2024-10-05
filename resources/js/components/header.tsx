import * as React from 'react';
import { Link, usePage } from '@inertiajs/react';
// types
import { SidebarNavItem } from '@/types';
// global components
import { HeaderUserMenu } from '@/components/header-user-menu';
import { Icons } from '@/components/icons';
import { MobileNav } from '@/components/mobile-nav';

interface HeaderProps {
  items?: SidebarNavItem[];
  defaultAccess?: boolean;
}

export function Header({ items, defaultAccess }: HeaderProps) {
  const { auth, title } = usePage<any>().props;
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);

  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex gap-6 md:gap-10">
          <div className="lg:hidden">
            {!showMobileMenu ? (
              <Icons.menu onClick={() => setShowMobileMenu(!showMobileMenu)} />
            ) : (
              <Icons.close />
            )}
          </div>

          <Link
            href={route('dashboard')}
            className="hidden items-center space-x-2 lg:flex"
          >
            <div className="hidden lg:block">
              <img src="/assets/logo.svg" alt={title} className="h-8 w-auto" />
            </div>
            <span className="hidden font-bold sm:inline-block">{title}</span>
          </Link>
          {showMobileMenu && items && (
            <MobileNav
              items={items}
              title={title}
              showMobileMenu={showMobileMenu}
              setShowMobileMenu={setShowMobileMenu}
              defaultAccess={true}
            />
          )}
        </div>
        <HeaderUserMenu
          user={{
            name: auth.user.name,
            image: 'https://avatars.githubusercontent.com/u/31546211?v=4',
            email: auth.user.email,
          }}
        />
      </div>
    </header>
  );
}
