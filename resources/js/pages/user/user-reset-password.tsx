import { useForm } from '@inertiajs/react';
import { useState } from 'react';
// global components
import { toast } from 'sonner';
import { FormInput, FormButtonSubmit } from '@/components/form/input';

type ErrorMessageProps = {
  current_password: string;
  password: string;
};

type UserResetPWProps = {
  setPwReset: any;
};

export default function UserResetPassword({ setPwReset }: UserResetPWProps) {
  const [errorMessage, setErrorMessage] = useState<ErrorMessageProps>({
    current_password: '',
    password: '',
  });
  const { data, setData, put, processing, reset } = useForm({
    current_password: '',
    password: '',
    password_confirmation: '',
  });

  function submitNewPassword(e: React.SyntheticEvent) {
    e.preventDefault();
    put(route('user-password.update'), {
      preserveScroll: true,
      preserveState: true,
      onSuccess: (success: any) => {
        reset();
        setPwReset(false);
        toast.success('Successfully updated password');
      },
      onError: (errors: any) => {
        setErrorMessage(errors.updatePassword);
      },
    });
  }

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-md font-bold leading-9 tracking-tight text-gray-900">
          Reset Password Form
        </h2>
      </div>
      <form className="space-y-6" onSubmit={submitNewPassword}>
        <FormInput
          type="password"
          id="current_password"
          placeholder="Enter Your Current Password"
          value={data.current_password}
          onChange={(e) => setData('current_password', e.target.value)}
          error={errorMessage.current_password}
        />
        <FormInput
          type="password"
          id="password"
          placeholder="Enter Your New Password"
          value={data.password}
          onChange={(e) => setData('password', e.target.value)}
          error={errorMessage.password}
        />
        <FormInput
          type="password"
          id="password_confirmation"
          placeholder="Enter Your New Password"
          value={data.password_confirmation}
          onChange={(e) => setData('password_confirmation', e.target.value)}
          error={errorMessage.password}
        />
        <FormButtonSubmit loading={processing} label={'Sign In'} />
      </form>
    </>
  );
}
