import { usePage } from '@inertiajs/react';
// layouts
import DashboardLayout from '@/layouts/main';
// global components
import {
  FormInput,
  FormButtonSubmit,
  FormSelect,
} from '@/components/form/input';

type QuestionProps = {
  question: string;
  type: string;
  slug: string;
};

export default function CompanyPage() {
  const { formBasicQuestions, formAddressQuestions } = usePage<any>().props;

  return (
    <DashboardLayout
      pageTitle={'Company Information'}
      pageDescription={'Basic contact information of the company.'}
    >
      <h2>General and Contact Information</h2>
      <div className="grid lg:grid-cols-4 gap-4">
        {formBasicQuestions.map((question: QuestionProps) => (
          <FormInput
            id={question.slug}
            type={question.type}
            label={question.question}
          />
        ))}
      </div>
      <h2>Address Information</h2>
      <div className="grid lg:grid-cols-5 gap-4">
        {formAddressQuestions.map((question: QuestionProps) => (
          <FormInput
            id={question.slug}
            type={question.type}
            label={question.question}
          />
        ))}
      </div>
    </DashboardLayout>
  );
}
