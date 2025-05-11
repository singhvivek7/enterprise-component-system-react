import { useCallback } from 'react';
import { cn } from '@/lib/utils';
import { useFormStore } from '@/stores/formStore';
import { Button } from '@/components/ui/button';
import { MultiStepFormProps } from './types';
import FormStepComponent from './FormStep';

const MultiStepForm = ({ steps, onSubmit }: MultiStepFormProps) => {
  const { formState, setCurrentStep, setError, clearError, resetForm } =
    useFormStore();
  const { data, currentStep, errors } = formState;

  const visibleSteps = steps.filter(
    step => !step.condition || step.condition(data)
  );

  const validateStep = useCallback(
    (stepIndex: number) => {
      const step = visibleSteps[stepIndex];
      let isValid = true;
      step.fields.forEach(field => {
        if (field.conditional && !field.conditional(data)) return;
        if (field.required && !data[field.name]) {
          setError(field.name, `${field.label} is required`);
          isValid = false;
        } else if (field.validate) {
          const error = field.validate(data[field.name], data);
          if (error) {
            setError(field.name, error);
            isValid = false;
          } else {
            clearError(field.name);
          }
        } else {
          clearError(field.name);
        }
      });
      return isValid;
    },
    [data, setError, clearError, visibleSteps]
  );

  const handleNext = () => {
    if (validateStep(currentStep) && currentStep < visibleSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      onSubmit(data);
      resetForm();
    }
  };

  return (
    <div className="w-2xl mx-auto bg-background border border-border rounded-lg p-6">
      <div className="flex justify-between mb-6 gap-2">
        {visibleSteps.map((step, index) => (
          <div
            key={step.id}
            className={cn(
              'flex-1 text-center text-sm',
              index <= currentStep
                ? 'text-primary font-semibold'
                : 'text-muted-foreground'
            )}>
            {step.title}
            <div
              className={cn(
                'h-2 mt-2 rounded-full',
                index <= currentStep ? 'bg-emerald-600' : 'bg-muted'
              )}
            />
          </div>
        ))}
      </div>

      <form
        onSubmit={e => e.preventDefault()}
        className="space-y-6"
        role="form"
        aria-label="Multi-step Form">
        <FormStepComponent
          step={visibleSteps[currentStep].fields}
          data={data}
          errors={errors}
        />
        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={handlePrev}
            disabled={currentStep === 0}>
            Previous
          </Button>
          {currentStep < visibleSteps.length - 1 ? (
            <Button type="button" variant="outline" onClick={handleNext}>
              Next
            </Button>
          ) : (
            <Button
              type="button"
              className="bg-emerald-600 hover:bg-emerald-500"
              onClick={() => {
                throw new Error('Test');
                // handleSubmit();
              }}>
              Submit
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default MultiStepForm;
