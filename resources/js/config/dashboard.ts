import { DashboardConfig } from "@/types"

export const dashboardConfig: DashboardConfig = {
  // mainNav: [
  //   {
  //     title: "Documentation",
  //     href: "/docs",
  //   },
  //   {
  //     title: "Support",
  //     href: "/support",
  //     disabled: true,
  //   },
  // ],
  sidebarNav: [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: "post",
      slug: "dashboard",
      pathKey: "dashboard"
    },
    {
      title: "User Group",
      href: route('system-settings.user-group.index'),
      icon: "userSquare",
      slug: "user_group",
      pathKey: "system-settings.user-group.*"
    },
    {
      title: "Users",
      href: route('system-settings.users.index'),
      icon: "user",
      slug: "users",
      pathKey: "system-settings.users.*"
    },
  ],
}
