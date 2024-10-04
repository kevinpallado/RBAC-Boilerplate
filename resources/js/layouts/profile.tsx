'use client';

import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { Link, usePage } from '@inertiajs/react';
import { mySettingsConfig } from '@/config/dashboard';
// global components
import { Button } from '@/components/ui/button';
import { HeaderNavigation } from '@/components/header-nav';
import { UserAccountNav } from '@/components/user-account-nav';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navItems = [
  { name: 'General', href: '#', active: true },
  { name: 'Security', href: '#' },
  { name: 'Integrations', href: '#' },
  { name: 'Support', href: '#' },
  { name: 'Organizations', href: '#' },
  { name: 'Advanced', href: '#' },
];

export default function ProfileLayout() {
  const { auth } = usePage<any>().props;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const NavContent = () => (
    <nav className="grid gap-4 text-sm text-muted-foreground">
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={item.active ? 'font-semibold text-primary' : ''}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <HeaderNavigation items={mySettingsConfig.sidebarNav} />
          <UserAccountNav
            user={{
              name: auth.user.name,
              image: 'https://avatars.githubusercontent.com/u/31546211?v=4',
              email: auth.user.email,
            }}
          />
        </div>
      </header>
      <div className="container xl:grid flex-1 gap-5 md:grid-cols-[200px_1fr]">
        {isMobile ? (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="mb-4 md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <NavContent />
            </SheetContent>
          </Sheet>
        ) : (
          <aside className="hidden flex-col xl:flex">
            <NavContent />
          </aside>
        )}
        <div className="grid gap-6">
          {/* Main content area */}
          <div className="grid gap-4">
            <h2 className="text-lg font-semibold">Content Area</h2>
            <p className="text-sm text-muted-foreground">
              This is where the main content for each section would be
              displayed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
