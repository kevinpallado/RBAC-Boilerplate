import { Link, useForm, usePage } from '@inertiajs/react';
// layout
import AuthLayout from '@/layouts/auth';
// global components
import { FormInput, FormButtonSubmit } from '@/components/form/input';

export default function ForgotPassword() {
  const { email, token } = usePage<any>().props;
  const { data, setData, post, processing, errors } = useForm({
    email: email,
    password: '',
    password_confirmation: '',
    token: token,
  });

  function submitForgotPassword(e: React.SyntheticEvent) {
    e.preventDefault();
    post(route('password.update'));
  }

  return (
    <AuthLayout>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href={route('login')}>
          <img
            className="mx-auto w-2/4"
            src="/assets/logo.svg"
            alt="Your Company"
          />
        </Link>
        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Reset Your Password
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <form className="space-y-6" onSubmit={submitForgotPassword}>
            <FormInput
              type="text"
              id="email"
              placeholder="Enter Your Email"
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
              error={errors.email}
            />
            <FormInput
              type="password"
              id="password"
              placeholder="Your New Password"
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
              error={errors.password}
            />
            <FormInput
              type="password"
              id="password_confirmation"
              placeholder="Password Confirmation"
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
