import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

type FormErrors<T> = Partial<Record<keyof T, string>>;

type FormHandler<T> = {
  formData: T;
  errors: FormErrors<T>;
  setFormData: (data: T) => void;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  handleErrors: (err: unknown) => void;
};

export function useForm<T>(initialState: T): FormHandler<T> {
  const [formData, setFormData] = useState<T>(initialState);
  const [errors, setErrors] = useState<FormErrors<T>>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ): void => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleErrors = (err: unknown): void => {
    if (axios.isAxiosError(err)) {
      const axiosError = err as AxiosError<{
        errors?: Record<keyof T, string>;
        description?: string;
      }>;

      if (axiosError.response?.data.errors) {
        setErrors(axiosError.response.data.errors);
      } else if (axiosError.response?.data.description) {
        toast.error(axiosError.response?.data?.description, {
          position: 'bottom-center',
        });
      }
    } else {
      toast.error('Erro desconhecido. Tente novamente.', {
        position: 'bottom-center',
      });
    }

    console.error(err);
  };

  return { formData, errors, setFormData, handleChange, handleErrors };
}
