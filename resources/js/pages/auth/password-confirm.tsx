import { useForm } from '@inertiajs/react';
// layout
import AuthLayout from '@/layouts/auth';
// global components
import { FormInput, FormButtonSubmit } from '@/components/form/input';

export default function PasswordConfirm() {
  const { data, setData, post, processing, errors } = useForm({
    password: '',
    password_confirmation: '',
  });

  function submitPasswordConfirm(e: React.SyntheticEvent) {
    e.preventDefault();
    post(route('password.confirm'));
  }

  return (
    <AuthLayout>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Confirm Your Password
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <form className="space-y-6" onSubmit={submitPasswordConfirm}>
            <FormInput
              type="password"
              id="password"
              placeholder="Password"
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
              error={errors.password}
            />
            <FormInput
              type="password"
              id="password_confirmation"
              placeholder="Confirm Password"
              value={data.password_confirmation}
              onChange={(e) => setData('password_confirmation', e.target.value)}
              error={errors.password_confirmation}
            />
            <FormButtonSubmit loading={processing} label={'Sign In'} />
          </form>
        </div>
      </div>
    </AuthLayout>
  );
}
