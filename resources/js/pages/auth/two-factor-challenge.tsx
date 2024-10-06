import { useForm } from '@inertiajs/react';
import { useState } from 'react';
// global components
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FormInput, FormButtonSubmit } from '@/components/form/input';
import { Label } from '@/components/ui/label';

export default function TwoFactorChallenge() {
  const [useAuthCode, setAuthCode] = useState(true);
  const { data, setData, post, processing, errors } = useForm({
    code: '',
    recovery_code: '',
  });

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    post(route('two-factor.login'));
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-[350px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">
            Two-Factor Authentication
          </CardTitle>
          <CardDescription className="text-center">
            {useAuthCode
              ? 'Enter the 6-digit code from your authenticator app'
              : 'Enter your emergency recovery code'}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {useAuthCode ? (
              <FormInput
                type="text"
                id="code"
                placeholder="000000"
                value={data.code}
                onChange={(e) => setData('code', e.target.value)}
                error={errors.code}
                className="text-center text-2xl tracking-widest"
              />
            ) : (
              <FormInput
                type="text"
                id="recovery_code"
                placeholder="Recovery Code"
                value={data.recovery_code}
                onChange={(e) => setData('recovery_code', e.target.value)}
                error={errors.recovery_code}
                className="text-center text-2xl tracking-widest"
              />
            )}
            <div className="grid justify-items-end">
              <Label
                className="font-medium text-primary underline underline-offset-4 cursor-pointer"
                onClick={(e) => setAuthCode(!useAuthCode)}
              >
                {useAuthCode
                  ? 'Use a recovery code'
                  : 'Use an authentication code'}
              </Label>
            </div>
            <FormButtonSubmit loading={processing} label={'Verify'} />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
