import { Icons } from '@/components/icons';

export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

export type MainNavItem = NavItem;

export type PageProps<
  T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
  auth: {
    user: User;
  };
};

export type SidebarNavItem = {
  title: string;
  slug: string;
  pathKey: string;
  href: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
} & (
  | {
      href: string;
      items?: never;
    }
  | {
      href?: string;
    }
);

export type DashboardConfig = {
  // mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[];
};
