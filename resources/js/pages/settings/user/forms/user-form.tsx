import { useForm, usePage } from '@inertiajs/react';
// global components
import { toast } from 'sonner';
import {
  FormInput,
  FormButtonSubmit,
  FormSelect,
} from '@/components/form/input';
import { ConfirmationDialog } from '@/components/form/confirmation-dialog';
// hooks
import { useBoolean } from '@/hooks/use-boolean';
// layouts
import DashboardLayout from '@/layouts/main';

export default function UserForm() {
  const { user, userGroups } = usePage<any>().props;

  const confirmDialog = useBoolean(false);
  const { data, setData, post, put, reset, processing, errors } = useForm({
    user_id: user?.id ?? '',
    email: user?.email ?? '',
    first_name: user?.first_name ?? '',
    last_name: user?.last_name ?? '',
    user_uuid: user?.user_uuid ?? '',
    group_id: user?.group_id ?? '',
    action: 'user-detail',
  });
  // confirmForm function to handle opening of dialog confirmation
  const confirmForm = (e: any) => {
    e.preventDefault();
    confirmDialog.onTrue();
  };
  // submitForm function for Form Data submission
  const submitForm = (e: any) => {
    user
      ? put(route('system-settings.users.update', user.id), {
          preserveScroll: true,
          preserveState: true,
          onSuccess: (success: any) => {
            toast.success(success.props.notification.message);
          },
          onError: (errors: any) => {
            toast.error('Something went wrong. Check form');
          },
        })
      : post(route('system-settings.users.store'), {
          preserveScroll: true,
          preserveState: true,
          onSuccess: (success: any) => {
            reset();
            toast.success(success.props.notification.message);
          },
          onError: (errors: any) => {
            toast.error('Something went wrong. Check form');
          },
        });
  };

  return (
    <DashboardLayout
      pageTitle={'User Form'}
      pageDescription={'Fill out form to create/update user.'}
    >
      <ConfirmationDialog
        open={confirmDialog.value}
        openChange={confirmDialog.onToggle}
        formFn={submitForm}
      />
      <form className="space-y-6" onSubmit={confirmForm}>
        <div className="grid lg:grid-cols-2 gap-4">
          <FormInput
            type="text"
            id="first_name"
            placeholder="John"
            label="First Name"
            value={data.first_name}
            onChange={(e) => setData('first_name', e.target.value)}
            error={errors.first_name}
            required={true}
          />
          <FormInput
            type="text"
            id="last_name"
            placeholder="Doe"
            label="Last Name"
            value={data.last_name}
            onChange={(e) => setData('last_name', e.target.value)}
            error={errors.last_name}
            required={true}
          />
        </div>
        <div className="grid lg:grid-cols-2 gap-4">
          <FormInput
            type="text"
            id="user_uuid"
            placeholder="0000011"
            label="Employee ID#"
            value={data.user_uuid}
            onChange={(e) => setData('user_uuid', e.target.value)}
            error={errors.user_uuid}
            required={true}
            disabled={user?.user_uuid}
          />
          <FormInput
            type="email"
            id="email"
            placeholder="sample@gmail.com"
            label="Email"
            value={data.email}
            onChange={(e) => setData('email', e.target.value)}
            error={errors.email}
            required={true}
          />
        </div>
        <FormSelect
          label="User Group"
          selectOptions={userGroups}
          onChange={(e: any) => setData('group_id', e)}
          placeholder="Select User Group"
          value={data.group_id}
          error={errors.group_id}
          required={true}
        />
        <div className="flex justify-end">
          <FormButtonSubmit loading={processing} label={'Submit'} />
        </div>
      </form>
    </DashboardLayout>
  );
}
