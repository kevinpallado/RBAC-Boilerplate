import { Head, usePage } from "@inertiajs/react";
// layouts
import DashboardLayout from "@/layouts/main";
// global components
import { DataTable } from "@/components/datatable/datatable"
// local components
import { User, columns } from "./columns";

export default function UserPage() {
    // constants
    const { users } = usePage<any>().props;

    return (
        <>
            <Head title="Users" />
            <DashboardLayout pageTitle={"User Accounts"} pageDescription={"Accounts within the system."}>
                <DataTable columns={columns} links={users.links} meta={users.meta} data={users.data} />
            </DashboardLayout>
        </>
    );
}
