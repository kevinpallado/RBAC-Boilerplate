"use client";

import { Link, usePage } from "@inertiajs/react";

import { SidebarNavItem } from "@/types";
import { cn } from "@/utils";
import { Icons } from "@/components/icons";

interface DashboardNavProps {
    items: SidebarNavItem[];
}

export function DashboardNav({ items }: DashboardNavProps) {
    const { auth } = usePage<any>().props;

    if (!items?.length) {
        return null;
    }

    function userHasAccess(pageAccess: string) {
        if(pageAccess === "dashboard") {
            return true;
        }
        return auth.access.some(function (page: any) {
            return page.page_slug === pageAccess;
        });
    }

    return (
        <nav className="grid items-start gap-2">
            {items.map((item, index) => {
                const Icon = Icons[item.icon || "arrowRight"];
                return (
                    userHasAccess(item.slug) && (item.href && (
                        <Link
                            key={index}
                            href={item.disabled ? "/" : item.href}
                        >
                            <span
                                className={cn(
                                    "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                                    route().current(item.pathKey)
                                        ? "bg-accent"
                                        : "transparent"
                                )}
                            >
                                <Icon className="mr-2 h-4 w-4" />
                                <span>{item.title}</span>
                            </span>
                        </Link>
                    ))
                );
            })}
        </nav>
    );
}
