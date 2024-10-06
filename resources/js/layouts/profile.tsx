'use client';

import { Head, Link } from '@inertiajs/react';
import { mySettingsConfig } from '@/config/dashboard';
// utils
import { cn } from '@/utils';
// global components
import { Header } from '@/components/header';
import { Toaster } from '@/components/ui/sonner';

interface ProfileLayoutProps {
  children: React.ReactNode;
  pageTitle: string;
}

export default function ProfileLayout({
  children,
  pageTitle,
}: ProfileLayoutProps) {
  const NavContent = () => (
    <nav className="grid gap-2">
      {mySettingsConfig.sidebarNav.map((item: any) => (
        <Link key={item.title} href={item.href}>
          <span
            className={cn(
              'group flex items-center rounded-md px-3 py-1 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
              route().current(item.pathKey) ? 'bg-accent' : 'transparent'
            )}
          >
            <span>{item.title}</span>
          </span>
        </Link>
      ))}
    </nav>
  );

  return (
    <>
      <Head title={pageTitle} />
      <Toaster position="top-right" richColors />

      <div className="flex min-h-screen flex-col space-y-6">
        <Header items={mySettingsConfig.sidebarNav} />
        <div className="container lg:grid flex-1 gap-5 md:grid-cols-[200px_1fr]">
          <aside className="hidden flex-col lg:flex">
            <NavContent />
          </aside>
          <div className="grid gap-6">
            {/* Main content area */}
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
