import { DashboardConfig } from "@/types"

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
    },
    {
      title: "Support",
      href: "/support",
      disabled: true,
    },
  ],
  sidebarNav: [
    {
      title: "Posts",
      href: "/dashboard",
      icon: "post",
    },
    {
      title: "User Group",
      href: "/dashboard/billing",
      icon: "userSquare",
    },
    {
      title: "Users",
      href: route('system-settings.users.index'),
      icon: "user",
    },
  ],
}
