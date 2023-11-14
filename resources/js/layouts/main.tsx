import { dashboardConfig } from "@/config/dashboard";
import { MainNav } from "@/components/main-nav";
import { DashboardNav } from "@/components/nav";
import { UserAccountNav } from "@/components/user-account-nav";
import { usePage } from "@inertiajs/react";

interface DashboardLayoutProps {
    pageTitle: String;
    pageDescription: String;
    children?: React.ReactNode;
}

export default function DashboardLayout({ pageTitle, pageDescription, children }: DashboardLayoutProps) {
    const { auth } = usePage<any>().props;

    return (
        <div className="flex min-h-screen flex-col space-y-6">
            <header className="sticky top-0 z-40 border-b bg-background">
                <div className="container flex h-16 items-center justify-between py-4">
                    <MainNav />
                    <UserAccountNav
                        user={{
                            name: auth.user.name,
                            image: "https://avatars.githubusercontent.com/u/31546211?v=4",
                            email: auth.user.email,
                        }}
                    />
                </div>
            </header>
            <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
                <aside className="hidden w-[200px] flex-col md:flex">
                    <DashboardNav items={dashboardConfig.sidebarNav} />
                </aside>
                <main className="flex w-full flex-1 flex-col overflow-hidden">
                    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
                        <div className="flex items-center justify-between space-y-2">
                            <div>
                                <h2 className="text-2xl font-bold tracking-tight">
                                    {pageTitle}
                                </h2>
                                <p className="text-muted-foreground">
                                    {pageDescription}
                                </p>
                            </div>
                        </div>
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
