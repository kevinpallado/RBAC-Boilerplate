import { Icons } from '@/components/icons';

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
}

export interface UserDisplay {
  name: string;
  email: string;
  image: any;
}

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
export type SidebarNavSubItem = {
  title: string;
  slug?: string;
  pathKey?: string;
  href?: string;
  icon?: keyof typeof Icons;
};
export type SidebarNavItem = {
  title: string;
  slug?: string;
  pathKey?: string;
  href?: string;
  icon?: keyof typeof Icons;
  module: boolean;
  pages: any;
};

export type DashboardConfig = {
  sidebarNav: SidebarNavItem[];
};
