import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { FormState } from '@/components/MultiStepForm/types';

interface FormStore {
  formState: FormState;
  setField: (name: string, value: any) => void;
  setCurrentStep: (step: number) => void;
  setError: (name: string, error: string) => void;
  clearError: (name: string) => void;
  resetForm: () => void;
}

export const useFormStore = create<FormStore>()(
  persist(
    set => ({
      formState: {
        data: {},
        currentStep: 0,
        errors: {},
      },
      setField: (name, value) =>
        set(state => ({
          formState: {
            ...state.formState,
            data: { ...state.formState.data, [name]: value },
          },
        })),
      setCurrentStep: step =>
        set(state => ({
          formState: { ...state.formState, currentStep: step },
        })),
      setError: (name, error) =>
        set(state => ({
          formState: {
            ...state.formState,
            errors: { ...state.formState.errors, [name]: error },
          },
        })),
      clearError: name =>
        set(state => {
          const { [name]: _, ...rest } = state.formState.errors;
          return {
            formState: { ...state.formState, errors: rest },
          };
        }),
      resetForm: () =>
        set({
          formState: { data: {}, currentStep: 0, errors: {} },
        }),
    }),
    { name: 'form-storage' }
  )
);
