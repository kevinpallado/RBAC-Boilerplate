import { useForm, usePage } from '@inertiajs/react';
// global components
import {
  FormInput,
  FormButtonSubmit,
  FormSelect,
} from '@/components/form/input';
// layouts
import DashboardLayout from '@/layouts/main';

export default function UserForm() {
  const { userGroups } = usePage<any>().props;

  const { data, setData, post, processing, errors } = useForm({
    email: '',
    first_name: '',
    last_name: '',
    middle_name: '',
    employee_id: '',
    group_id: '',
  });

  const submitForm = (e: any) => {
    e.preventDefault();
    console.log(data);
  };

  return (
    <DashboardLayout
      pageTitle={'User Form'}
      pageDescription={'Fill out form to create/update user.'}
    >
      <form className="space-y-6" onSubmit={submitForm}>
        <div className="grid lg:grid-cols-3 gap-4">
          <FormInput
            type="text"
            id="first_name"
            placeholder="John"
            label="First Name"
            value={data.first_name}
            onChange={(e) => setData('first_name', e.target.value)}
            error={errors.first_name}
          />
          <FormInput
            type="text"
            id="middle_name"
            placeholder="Magbayong"
            label="Middle Name"
            value={data.middle_name}
            onChange={(e) => setData('middle_name', e.target.value)}
            error={errors.middle_name}
          />
          <FormInput
            type="text"
            id="last_name"
            placeholder="Doe"
            label="Last Name"
            value={data.last_name}
            onChange={(e) => setData('last_name', e.target.value)}
            error={errors.last_name}
          />
        </div>
        <div className="grid lg:grid-cols-2 gap-4">
          <FormInput
            type="text"
            id="employee_id"
            placeholder="0000011"
            label="Employee ID#"
            value={data.employee_id}
            onChange={(e) => setData('employee_id', e.target.value)}
            error={errors.employee_id}
          />
          <FormInput
            type="email"
            id="email"
            placeholder="sample@gmail.com"
            label="Email"
            value={data.email}
            onChange={(e) => setData('email', e.target.value)}
            error={errors.email}
          />
        </div>
        <FormSelect
          label="User Group"
          selectOptions={userGroups}
          onChange={(e: any) => setData('group_id', e)}
          placeholder="Select User Group"
        />
        <div className="flex justify-end">
          <FormButtonSubmit loading={processing} label={'Submit'} />
        </div>
      </form>
    </DashboardLayout>
  );
}
