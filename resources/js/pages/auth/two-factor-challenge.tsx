import { useForm } from '@inertiajs/react';
// global components
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FormInput, FormButtonSubmit } from '@/components/form/input';

export default function TwoFactorChallenge() {
  const { data, setData, post, processing, errors } = useForm({
    code: '',
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
            Enter the 6-digit code from your authenticator app
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <FormInput
              type="text"
              id="code"
              placeholder="000000"
              value={data.code}
              onChange={(e) => setData('code', e.target.value)}
              error={errors.code}
              className="text-center text-2xl tracking-widest"
            />

            <FormButtonSubmit loading={processing} label={'Verify'} />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
