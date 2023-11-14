import { AxiosInstance } from 'axios';
import ziggyRoute, { Config as ZiggyConfig } from 'ziggy-js';

import type { Page, PageProps, Errors, ErrorBag } from "@inertiajs/core";

declare global {
    interface Window {
        axios: AxiosInstance;
    }

    interface InertiaProps extends Page<PageProps> {
        errors: Errors & ErrorBag;
        siteTitle: string;
        [key: string]: any;
    }

    var route: typeof ziggyRoute;
    var Ziggy: ZiggyConfig;
}
