import { cn } from '@/lib/utils';
import { FormField, FormData } from './types';
import { useFormStore } from '@/stores/formStore';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface FormStepProps {
  step: FormField[];
  data: FormData;
  errors: Record<string, string>;
}

const FormStep = ({ step, data, errors }: FormStepProps) => {
  const { setField, setError, clearError } = useFormStore();

  const handleChange = (field: FormField, value: any) => {
    setField(field.name, value);
    if (field.validate) {
      const error = field.validate(value, data);
      if (error) {
        setError(field.name, error);
      } else {
        clearError(field.name);
      }
    }
  };

  return (
    <div className="space-y-4">
      {step.map(field => {
        if (field.conditional && !field.conditional(data)) return null;

        return (
          <div key={field.name} className="flex flex-col gap-1">
            <Label htmlFor={field.name} className="text-sm font-medium">
              {field.label}
              {field.required && <span className="text-destructive">*</span>}
            </Label>

            {field.type === 'select' ? (
              <Select
                value={data[field.name] || ''}
                onValueChange={value => handleChange(field, value)}>
                <SelectTrigger
                  id={field.name}
                  className={cn(
                    'w-full',
                    errors[field.name] &&
                      'border-destructive ring-1 ring-destructive'
                  )}>
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  {field.options?.map(option => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Input
                id={field.name}
                type={field.type}
                value={data[field.name] || ''}
                onChange={e => handleChange(field, e.target.value)}
                aria-invalid={!!errors[field.name]}
                aria-describedby={
                  errors[field.name] ? `${field.name}-error` : undefined
                }
                className={cn(
                  errors[field.name] &&
                    'border-destructive ring-1 ring-destructive'
                )}
              />
            )}

            {errors[field.name] && (
              <span
                id={`${field.name}-error`}
                className="text-destructive text-sm mt-1">
                {errors[field.name]}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FormStep;
