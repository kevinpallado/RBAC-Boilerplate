import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type AccessListArray = {
  page_slug: string;
};

type ModuleListArray = {
  module_slug: string;
};

export function userHasAccess(
  pageAccess: string | undefined,
  userAccessList: AccessListArray[]
) {
  if (pageAccess === 'dashboard') {
    return true;
  }
  return userAccessList.some(function (page: any) {
    return page.page_slug === pageAccess;
  });
}

export function userHasModuleAccess(
  moduleAccess: string | undefined,
  modules: ModuleListArray[]
) {
  return modules.some(function (module: any) {
    return module.module_slug === moduleAccess;
  });
}
