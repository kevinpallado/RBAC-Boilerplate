import { usePage } from '@inertiajs/react';
// layouts
import DashboardLayout from '@/layouts/main';
// global components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
// local components
import PolicyMapper from './policy-mapper';
// hooks
import { useBoolean } from '@/hooks/use-boolean';

type PolicyProps = {
  id: string;
  name: string;
  slug: string;
  module: string;
  description: string;
  policy_value_type: string;
  policy_value: string;
  last_modified_by: string;
  active: boolean;
  created_at: string;
  updated_at: string;
};
type PolicyModuleProps = {
  module: string;
  policies: PolicyProps[];
};

export default function Policy() {
  // constants
  const { _action, systemPolicies } = usePage<any>().props;
  const showLoadingDialog = useBoolean(false);

  return (
    <DashboardLayout
      pageTitle={'Policy Navigator'}
      pageDescription={'List of System Policy currently applied.'}
    >
      <Dialog open={showLoadingDialog.value}>
        <DialogContent className="[&>button]:hidden">
          <DialogHeader>
            <DialogTitle>Progress</DialogTitle>
            <DialogDescription>Processing your changes</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      {systemPolicies.map((policyModules: PolicyModuleProps) => {
        return (
          <>
            <p className="text-base">{policyModules.module}</p>
            {policyModules.policies.map((policy: PolicyProps) => (
              <PolicyMapper
                dialogTrigger={showLoadingDialog}
                id={policy.id}
                name={policy.name}
                slug={policy.slug}
                description={policy.description}
                policy_value_type={policy.policy_value_type}
                policy_value={policy.policy_value}
              />
            ))}
          </>
        );
      })}
    </DashboardLayout>
  );
}
