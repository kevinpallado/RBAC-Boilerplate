import { dashboardConfig } from '@/config/dashboard';
import { MainNav } from '@/components/main-nav';
import { DashboardNav } from '@/components/nav';
import { UserAccountNav } from '@/components/user-account-nav';
import { usePage } from '@inertiajs/react';

interface DashboardLayoutProps {
  pageTitle: String;
  pageDescription: String;
  pageAction?: React.ReactNode;
  children?: React.ReactNode;
}

export default function DashboardLayout({
  pageTitle,
  pageDescription,
  pageAction,
  children,
}: DashboardLayoutProps) {
  const { auth } = usePage<any>().props;

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav items={dashboardConfig.sidebarNav} />
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
        <aside className="hidden flex-col xl:flex">
          <DashboardNav items={dashboardConfig.sidebarNav} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          <div className="h-full flex-1 flex-col space-y-8 lg:flex">
            <div className="flex items-center justify-between space-y-2">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">
                  {pageTitle}
                </h2>
                <p className="text-muted-foreground">{pageDescription}</p>
              </div>
              {pageAction}
            </div>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
