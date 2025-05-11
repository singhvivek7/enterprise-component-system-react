export interface FormData {
  [key: string]: any;
}

export interface FormStep {
  id: string;
  title: string;
  fields: FormField[];
  condition?: (data: FormData) => boolean;
}

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'select' | 'number';
  required?: boolean;
  options?: string[];
  validate?: (value: any, data: FormData) => string | null;
  conditional?: (data: FormData) => boolean;
}

export interface FormState {
  data: FormData;
  currentStep: number;
  errors: Record<string, string>;
}

export interface MultiStepFormProps {
  steps: FormStep[];
  onSubmit: (data: FormData) => void;
}
