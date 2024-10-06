import axios from 'axios';
import { useEffect, useState } from 'react';
import { router, useForm, usePage } from '@inertiajs/react';
import parse from 'html-react-parser';
// layout
import ProfileLayout from '@/layouts/profile';
// global components
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { FormInput, FormButtonSubmit } from '@/components/form/input';

export default function MySettings() {
  const { notification, confirmed2FA, twoFASecret, twoFARecCodes } =
    usePage<any>().props;

  const [isTwoFAEnabled, setTwoFAEnabled] = useState<boolean>(
    twoFASecret && twoFARecCodes ? true : false
  );
  const [pwConfirmStatus, setPwConfirmStatus] = useState<boolean>(false);
  const [twoFAConfirmError, setTwoFAConfirmError] = useState<string | null>(
    null
  );
  const [qrCode, setQrCode] = useState<any>(null);
  const [recoveryCode, setRecoveryCode] = useState<any>(null);

  const { data, setData, post, processing } = useForm({
    code: '',
    confirmTwoFactorAuthentication: '',
  });

  function checkedChange(value: boolean) {
    value
      ? router.post(route('two-factor.enable'))
      : router.delete(route('two-factor.disable'), {
          preserveScroll: true,
          preserveState: true,
          onSuccess: () => {
            setTwoFAEnabled(false);
          },
        });
  }

  function confirm2FACode(e: any) {
    e.preventDefault();
    post(route('two-factor.confirm'), {
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => {
        setQrCode(null);
      },
      onError: (error: any) => {
        setTwoFAConfirmError(error.confirmTwoFactorAuthentication.code);
      },
    });
  }

  const showQrCode = () => {
    axios
      .get(route('two-factor.qr-code'))
      .then((response) => setQrCode(response.data.svg))
      .catch((error) => toast.error(error.response.data.message));
  };

  const showRecoveryCodes = () => {
    axios
      .get(route('two-factor.recovery-codes'))
      .then((response) => {
        setRecoveryCode(response.data);
      })
      .catch((error) => toast.error(error.response.data.message));
  };

  useEffect(() => {
    axios
      .get(route('password.confirmation'))
      .then((response: any) => setPwConfirmStatus(response.data.confirmed));
  }, []);

  return (
    <ProfileLayout pageTitle={'Settings'}>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Security</h3>
          <p className="text-sm text-muted-foreground">
            Configure your account security.
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <Label className="space-y-0.5">Confirm Password Status</Label>
            <p className="text-sm text-muted-foreground">
              Password confirmation ensures the initial password matches before
              proceeding with two-factor authentication.
            </p>
          </div>
          <Badge
            className={!pwConfirmStatus ? 'cursor-pointer' : ''}
            variant={pwConfirmStatus ? 'destructive' : 'default'}
            onClick={(e) => {
              if (!pwConfirmStatus) {
                router.visit('confirm-password');
              }
            }}
          >
            {pwConfirmStatus ? 'Confirmed' : 'To Confirm'}
          </Badge>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <Label className="space-y-0.5">
              {isTwoFAEnabled ? 'Disable' : 'Enable'} Two Factor Authentication
            </Label>
            <p className="text-sm text-muted-foreground">
              Two-factor authentication adds security by requiring a password
              and a second verification step.
            </p>
          </div>
          <Switch
            checked={
              notification.twofa === 'two-factor-authentication-enabled' ||
              isTwoFAEnabled
            }
            onCheckedChange={checkedChange}
          />
        </div>
        {(notification.twofa === 'two-factor-authentication-enabled' ||
          isTwoFAEnabled) && (
          <div className="flex flex-row items-center text-center justify-evenly rounded-lg">
            {!confirmed2FA && (
              <div className="space-y-5 text-center">
                <Button onClick={(e) => showQrCode()}>Show QR Code</Button>
                <br />
                <Label className="space-y-0.5">
                  <i className="text-xs">Two FA Needs to Confirm</i>
                  <br />
                  Scan QR Code Below
                </Label>
                {qrCode && (
                  <div className="grid place-items-center">{parse(qrCode)}</div>
                )}
                {qrCode && (
                  <form className="space-y-3" onSubmit={confirm2FACode}>
                    <FormInput
                      type="text"
                      id="code"
                      placeholder="2FA Code"
                      value={data.code}
                      onChange={(e) => setData('code', e.target.value)}
                      error={twoFAConfirmError}
                    />
                    <FormButtonSubmit loading={processing} label={'Confirm'} />
                  </form>
                )}
              </div>
            )}
            <div className="space-y-5 text-center">
              <Button onClick={(e) => showRecoveryCodes()}>
                Show Recovery Key
              </Button>
              <br />
              <Label className="space-y-0.5">Save Recovery Code</Label>
              {recoveryCode?.length > 0 && (
                <div className="bg-gray-100 p-3 rounded-md shadow-sm items-center justify-center">
                  {recoveryCode.map((code: string, index: number) => (
                    <div
                      className="text-sm font-mono break-all text-center"
                      key={index}
                    >
                      {code}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </ProfileLayout>
  );
}
