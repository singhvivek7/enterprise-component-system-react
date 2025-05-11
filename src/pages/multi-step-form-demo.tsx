import MultiStepForm from '@/components/MultiStepForm/MultiStepForm';
import { FormStep } from '@/components/MultiStepForm/types';

const steps: FormStep[] = [
  {
    id: 'personal',
    title: 'Personal Info',
    fields: [
      {
        name: 'name',
        label: 'Full Name',
        type: 'text',
        required: true,
        validate: (value: string) =>
          value.length < 2 ? 'Name must be at least 2 characters' : null,
      },
      {
        name: 'email',
        label: 'Email',
        type: 'email',
        required: true,
        validate: (value: string) =>
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
            ? 'Invalid email address'
            : null,
      },
    ],
  },
  {
    id: 'preferences',
    title: 'Preferences',
    fields: [
      {
        name: 'role',
        label: 'Role',
        type: 'select',
        required: true,
        options: ['Developer', 'Designer', 'Manager'],
      },
      {
        name: 'notifications',
        label: 'Receive Notifications',
        type: 'select',
        required: true,
        options: ['Yes', 'No'],
      },
      {
        name: 'frequency',
        label: 'Notification Frequency',
        type: 'select',
        options: ['Daily', 'Weekly', 'Monthly'],
        conditional: data => {
          return data.notifications === 'Yes';
        },
      },
    ],
  },
  {
    id: 'confirmation',
    title: 'Confirmation',
    fields: [
      {
        name: 'confirm',
        label: 'Confirm Details',
        type: 'select',
        required: true,
        options: ['Yes', 'No'],
        validate: (value: string) =>
          value !== 'Yes' ? 'You must confirm to proceed' : null,
      },
    ],
    condition: data => data.role !== 'Manager',
  },
];

export const MultiStepFormDemo = () => {
  const handleFormSubmit = (data: any) => {
    alert('Form Submitted: ' + JSON.stringify(data, null, 2));
  };

  return (
    <section>
      <h2 className="text-center text-4xl mt-12 mb-6">3. Multi-step Form</h2>
      <MultiStepForm steps={steps} onSubmit={handleFormSubmit} />
      <div></div>
    </section>
  );
};
