import { Head, useForm } from '@inertiajs/react';
import {
  FormInput,
  FormCheckBox,
  FormButtonSubmit,
} from '@/components/form/input';
// layout
import AuthLayout from '@/layouts/auth';

export default function Example() {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
    remember_me: false,
  });

  function submitLogin(e: React.SyntheticEvent) {
    e.preventDefault();
    post(route('login.submit'));
  }

  return (
    <AuthLayout>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto w-2/4"
          src="/assets/logo.svg"
          alt="Your Company"
        />
        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <form className="space-y-6" onSubmit={submitLogin}>
            <FormInput
              type="email"
              id="email"
              placeholder="Email"
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
              error={errors.email}
            />
            <FormInput
              type="password"
              id="password"
              placeholder="Password"
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
              error={errors.password}
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FormCheckBox
                  id="remember-me"
                  label="Remember Me"
                  checked={data.remember_me}
                  onCheckedChange={(e: any) => setData('remember_me', e)}
                />
              </div>

              <div className="text-sm leading-6">
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <FormButtonSubmit loading={processing} label={'Sign In'} />
          </form>
        </div>
      </div>
    </AuthLayout>
  );
}
