import { Head } from '@inertiajs/react';
// config
import { dashboardConfig } from '@/config/dashboard';
// global components
import { Header } from '@/components/header';
import { SidebarNavigation } from '@/components/web-nav';
import { Toaster } from '@/components/ui/sonner';

interface DashboardLayoutProps {
  pageTitle: string;
  pageDescription?: string;
  pageAction?: React.ReactNode;
  children: React.ReactNode;
}

export default function DashboardLayout({
  pageTitle,
  pageDescription,
  pageAction,
  children,
}: DashboardLayoutProps) {
  return (
    <>
      <Head title={pageTitle} />
      <Toaster position="top-right" richColors />
      <div className="flex min-h-screen flex-col space-y-6">
        <Header items={dashboardConfig.sidebarNav} />
        <div className="container lg:grid flex-1 gap-5 md:grid-cols-[200px_1fr]">
          <aside className="hidden flex-col lg:flex">
            <SidebarNavigation items={dashboardConfig.sidebarNav} />
          </aside>
          <main className="flex w-full flex-1 flex-col px-1 overflow-hidden">
            <div className="h-full flex-1 flex-col space-y-4 lg:flex">
              <div className="flex items-center justify-between space-y-2">
                <div>
                  <h2 className="mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
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
    </>
  );
}
