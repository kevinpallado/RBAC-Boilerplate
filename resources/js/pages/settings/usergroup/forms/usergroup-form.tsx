// global components
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { FormInput, FormButtonSubmit } from '@/components/form/input';

type UserGroupForm = {
  open: boolean;
  openToggle: () => void;
  userGroupForm: any;
  userGroupFormSubmit: (e: any) => void;
};

export default function UserGroupForm(props: UserGroupForm) {
  return (
    <Dialog open={props.open} onOpenChange={props.openToggle}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Form</DialogTitle>
        </DialogHeader>
        <form onSubmit={props.userGroupFormSubmit}>
          <div className="space-y-6">
            <FormInput
              type="text"
              id="user_group_name"
              placeholder="ex. Admin"
              label="User Group Name"
              value={props.userGroupForm.data.name}
              onChange={(e) =>
                props.userGroupForm.setData('name', e.target.value)
              }
              error={props.userGroupForm.errors.name}
              required={true}
            />
          </div>
          <div className="flex justify-end mt-3">
            <FormButtonSubmit
              loading={props.userGroupForm.processing}
              label={'Submit'}
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
