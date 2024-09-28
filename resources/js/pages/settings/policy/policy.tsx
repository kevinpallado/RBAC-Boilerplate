import { usePage } from '@inertiajs/react';
// layouts
import DashboardLayout from '@/layouts/main';
// local components
import PolicyMapper from './policy-mapper';

type PolicyProps = {
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
  return (
    <DashboardLayout
      pageTitle={'Policy Navigator'}
      pageDescription={'List of System Policy currently applied.'}
    >
      {systemPolicies.map((policyModules: PolicyModuleProps) => {
        return (
          <>
            <p className="text-base">{policyModules.module}</p>
            {policyModules.policies.map((policy: PolicyProps) => (
              <PolicyMapper
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
