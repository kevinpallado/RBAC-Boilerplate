import { router, usePage } from '@inertiajs/react';
// global components
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function CompanyBranches() {
  const { companyBranches } = usePage<any>().props;

  return (
    <>
      <div className="flex justify-end my-2">
        <Button
          onClick={(e) =>
            router.visit(route('system-settings.company-profile.create'))
          }
        >
          Create New Branch
        </Button>
      </div>
      <Table>
        <TableCaption>
          <b>"Number of Branches"</b> set in Company Details does not limit
          number of Branches added on this table.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Branch Name</TableHead>
            <TableHead>Branch Address</TableHead>
            <TableHead>Contact Info</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companyBranches.map((branch: any) => (
            <TableRow key={branch.id}>
              <TableCell className="font-medium">
                {branch.name}
                <br />
                {branch.code}
                <Badge
                  className="ml-1"
                  variant={branch.active ? 'default' : 'destructive'}
                >
                  {branch.active ? 'Active' : 'In-Active'}
                </Badge>
              </TableCell>
              <TableCell>
                {branch.street_address} {branch.brgy} {branch.city},
                {branch.province_state}
                <br />
                {branch.country} {branch.postal}
              </TableCell>
              <TableCell>
                <a href={`tel:${branch.phone}`}>{branch.phone}</a>
                <br />
                <a href={`mailto:${branch.email}`}>{branch.email}</a>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="destructive">Edit</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
