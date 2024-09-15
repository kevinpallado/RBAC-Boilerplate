import React from 'react';
// global components
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface CustomConfirmationDialog {
  open: boolean;
  subject?: string;
  description?: string;
  formFn?: (e: React.SyntheticEvent) => void;
  openChange: () => void;
}

export const ConfirmationDialog: React.FC<CustomConfirmationDialog> = (
  props
) => {
  return (
    <AlertDialog open={props.open} onOpenChange={props.openChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {props.subject ?? 'Confirm This Action'}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {props.description ?? 'Are you sure you want to submit this form?'}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={props.formFn}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
