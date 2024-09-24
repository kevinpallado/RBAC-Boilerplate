import { usePage, useForm } from '@inertiajs/react';
// global components
import { FormInput, FormButtonSubmit } from '@/components/form/input';
import { toast } from 'sonner';
// react
import { useEffect, useState } from 'react';

type QuestionProps = {
  info_tag: string;
  info_slug: string;
  info_type: string;
  info_category: string;
  info_value: string | number | undefined;
};

export default function CompanyForm() {
  const { formQuestions } = usePage<any>().props;

  const [formInput, setFormInput] = useState<any>({});

  const companyForm = useForm(formInput);

  const companyFormSubmit = (e: any) => {
    e.preventDefault();

    companyForm.post(route('system-settings.company-profile.store'), {
      preserveScroll: true,
      preserveState: true,
      onSuccess: (success: any) => {
        toast.success(success.props.notification.message);
      },
      onError: (errors: any) => {
        toast.error('Something went wrong. Check form');
      },
    });
  };

  useEffect(() => {
    formQuestions.map((questions: any) =>
      setFormInput((prevData: any) => ({
        ...prevData,
        [questions.info_slug]: questions.info_value,
      }))
    );
  }, []);
  return (
    <form onSubmit={companyFormSubmit}>
      <h2 className="py-4">General and Contact Information</h2>
      <div className="grid lg:grid-cols-4 gap-4">
        {formQuestions.map(
          (question: QuestionProps, index: number) =>
            question.info_category === 'general' && (
              <FormInput
                key={index}
                id={question.info_slug}
                type={question.info_type}
                label={question.info_tag}
                value={question.info_value}
                onChange={(e) =>
                  companyForm.setData(question.info_slug, e.target.value)
                }
              />
            )
        )}
      </div>
      <h2 className="py-4">Address Information</h2>
      <div className="grid lg:grid-cols-5 gap-4">
        {formQuestions.map(
          (question: QuestionProps, index: number) =>
            question.info_category === 'address' && (
              <FormInput
                key={index}
                id={question.info_slug}
                type={question.info_type}
                label={question.info_tag}
              />
            )
        )}
      </div>
      <div className="flex justify-end pt-4">
        <FormButtonSubmit loading={companyForm.processing} label={'Submit'} />
      </div>
    </form>
  );
}
