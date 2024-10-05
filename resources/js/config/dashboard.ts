import { DashboardConfig } from "@/types"

export const dashboardConfig: DashboardConfig = {
  sidebarNav: [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: "post",
        slug: "dashboard",
        pathKey: "dashboard",
        module: false,
        pages: []
      },
      {
        title: 'Management Settings',
        module: true,
        slug: 'management_settings',
        pages: [
          {
            title: "Company Profile",
            href: route('system-settings.company-profile.index'),
            icon: "building",
            slug: "company_profile",
            pathKey: "system-settings.company-profile.*"
          },
          {
            title: "Policy Navigator",
            href: route('system-settings.policy-navigator.index'),
            icon: "scale",
            slug: "policy_navigator",
            pathKey: "system-settings.policy-navigator.*"
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
        ]
      }
  ],
}

export const mySettingsConfig: DashboardConfig = {
  sidebarNav: [
    {
      title: "General",
      href: route('user.my-profile'),
      slug: "general",
      pathKey: "user.my-profile",
      module: false,
      pages: []
    },
    {
      title: "Settings",
      href: route('user.my-profile'),
      slug: "general",
      pathKey: "user.my-profile",
      module: false,
      pages: []
    },
    {
      title: "Logs",
      href: route('user.my-profile'),
      slug: "general",
      pathKey: "user.my-profile",
      module: false,
      pages: []
    },
  ],
}