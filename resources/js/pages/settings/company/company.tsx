// layouts
import DashboardLayout from '@/layouts/main';
// global components
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// local components
import CompanyForm from './forms/company-form';
import CompanyBranches from './company-branches';

export default function CompanyPage() {
  return (
    <DashboardLayout
      pageTitle={'Company Information'}
      pageDescription={'Basic contact information of the company.'}
    >
      <Tabs defaultValue="company" className="w-auto">
        <TabsList>
          <TabsTrigger value="company">Company Details</TabsTrigger>
          <TabsTrigger value="branches">Company Branch</TabsTrigger>
        </TabsList>
        <TabsContent value="company">
          <CompanyForm />
        </TabsContent>
        <TabsContent value="branches">
          <CompanyBranches />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
