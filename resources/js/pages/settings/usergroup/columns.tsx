import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type UserGroup = {
    id: string;
    name: string;
    email: string;
    created_at: string;
};

export const columns: ColumnDef<UserGroup>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "updated_at",
        header: "Date Last Updated",
        cell: ({ row }) => {
            const data = new Date(row.getValue("updated_at"));
            const formatted = data.toLocaleDateString();
            return <div className="font-medium">{formatted}</div>;
        },
    }
];
