import { router } from '@inertiajs/react';
// global components
import { toast } from 'sonner';
import { Checkbox } from '@/components/ui/checkbox';

type PolicyMapperProps = {
  dialogTrigger: any;
  id: string;
  name: string;
  slug: string;
  description: string;
  policy_value_type: string;
  policy_value: string;
};

export default function PolicyMapper(props: PolicyMapperProps) {
  const handleCheckboxChange = (newPolicyValue: boolean, policyId: string) => {
    props.dialogTrigger.onTrue();
    router.put(
      route('system-settings.policy-navigator.update', policyId),
      {
        policyValue: newPolicyValue,
      },
      {
        preserveScroll: true,
        preserveState: true,
        replace: true,
        onSuccess: (success: any) => {
          props.dialogTrigger.onFalse();
          toast.success(success.props.notification.message);
        },
        onError: (errors: any) => {
          props.dialogTrigger.onFalse();
          toast.error('Something went wrong. Check form');
        },
      }
    );
  };

  switch (props.policy_value_type) {
    case 'boolean':
      return (
        <div className="items-top flex space-x-2">
          <Checkbox
            id={props.slug}
            checked={props.policy_value === 'true' ? true : false}
            onCheckedChange={(e: any) => handleCheckboxChange(e, props.id)}
          />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor={props.slug}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {props.name}
            </label>
            <p className="text-sm text-muted-foreground">{props.description}</p>
          </div>
        </div>
      );
  }
}
