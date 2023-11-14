import { Head, usePage } from "@inertiajs/react";
// layouts
import DashboardLayout from "@/layouts/main";
// global components
import { DataTable } from "@/components/datatable/datatable"
// local components
import { UserGroup, columns } from "./columns";

export default function UserGroupPage() {
    // constants
    const { usergroup } = usePage<any>().props;

    return (
        <>
            <Head title="User Group" />
            <DashboardLayout pageTitle={"User Groups"} pageDescription={"Account groups within the system."}>
                <DataTable columns={columns} links={usergroup.links} meta={usergroup.meta} data={usergroup.data} />
            </DashboardLayout>
        </>
    );
}
