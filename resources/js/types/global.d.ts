import { AxiosInstance } from 'axios';
import { Config, Router } from 'ziggy-js';

import { PageProps as InertiaPageProps } from '@inertiajs/core';
import { PageProps as AppPageProps } from './';

type LaravelRoutes = {
  [key: string]: { uri: string; methods: string[] };
};
declare global {
  interface Window {
    axios: AxiosInstance;
  }

  interface ZiggyLaravelRoutes extends LaravelRoutes {}
  function route(): Router;
  function route(
    name: keyof ZiggyLaravelRoutes,
    params?: any,
    absolute?: boolean,
    customZiggy?: Config
  ): string;
}

declare module '@inertiajs/core' {
  interface PageProps extends InertiaPageProps, AppPageProps {}
}

export { LaravelRoutes };
