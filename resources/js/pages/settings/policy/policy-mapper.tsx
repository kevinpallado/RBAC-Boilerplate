import { Checkbox } from '@/components/ui/checkbox';

type PolicyMapperProps = {
  name: string;
  slug: string;
  description: string;
  policy_value_type: string;
  policy_value: string;
};

export default function PolicyMapper(props: PolicyMapperProps) {
  switch (props.policy_value_type) {
    case 'boolean':
      return (
        <div className="items-top flex space-x-2">
          <Checkbox
            id={props.slug}
            checked={props.policy_value === 'true' ? true : false}
            onCheckedChange={(e: any) => console.log(e)}
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
