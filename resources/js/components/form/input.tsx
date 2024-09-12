import React from 'react';
// global components
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DatePicker } from '@/components/form/date-picker';
// icons
import { ReloadIcon } from '@radix-ui/react-icons';

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string | null;
}

interface CustomCheckBoxProps extends React.RefAttributes<HTMLButtonElement> {
  id?: string;
  label?: string;
  error?: string | null;
  checked: boolean | 'indeterminate';
  onCheckedChange?: (checked: boolean | 'indeterminate') => void;
}

interface ButtonSubmit {
  loading: boolean;
  label: string;
  width?: string;
}

const renderError = (_error: string | null | undefined) => {
  if (_error) {
    return <p className="text-red-700 text-xs">{_error}</p>;
  }
};

export const FormInput: React.FC<CustomInputProps> = (props) => {
  const renderInput = () => {
    switch (props.type) {
      case 'date':
        const dateValue = props.value instanceof Date ? props.value : undefined;
        return (
          <DatePicker
            date={dateValue}
            setDate={props.onChange}
            placeholder={props.placeholder}
          />
        );
      default:
        return <Input {...props} />;
    }
  };

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor={props.id}>{props.label}</Label>
      {/*Renders Input*/}
      {renderInput()}
      {/*Renders Error Message*/}
      {renderError(props.error)}
    </div>
  );
};

export const FormButtonSubmit: React.FC<ButtonSubmit> = (props) => {
  return (
    <div>
      {props.loading ? (
        <Button className={`flex ${props.width ?? 'w-full'}`} disabled>
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </Button>
      ) : (
        <Button type="submit" className={`flex ${props.width ?? 'w-full'}`}>
          {props.label}
        </Button>
      )}
    </div>
  );
};

export const FormCheckBox: React.FC<CustomCheckBoxProps> = (props) => {
  return (
    <div className="flex items-center">
      <Checkbox id={props.id} {...props} />
      <Label
        className="ml-3 block text-sm leading-6 text-gray-900"
        htmlFor={props.id}
      >
        {props.label}
      </Label>
      {/*Renders Error Message*/}
      {renderError(props.error)}
    </div>
  );
};
