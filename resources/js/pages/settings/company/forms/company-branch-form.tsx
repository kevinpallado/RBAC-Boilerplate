// layouts
import DashboardLayout from '@/layouts/main';

export default function CompanyBranchForm() {
  return (
    <DashboardLayout
      pageTitle={'Company Branch Form'}
      pageDescription={'Fill out form to create/update company branch.'}
    >
      <form className="space-y-6"></form>
    </DashboardLayout>
  );
}
