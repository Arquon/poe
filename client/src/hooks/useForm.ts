import { useEffect, useState } from "react";
import validator, { type TValidator } from "@/utils/validator/validator";
import { type ValidationErrors } from "@/types/validator/errorTypes";

interface UseFormWithValidationParams<T extends object> {
   initialData: T;
   validatorConfig: Partial<TValidator<T>>;
}

interface UseFormWithValidationReturnType<T> {
   data: T;
   changeHandler: (partialData: Partial<T>) => void;
   errors: ValidationErrors<T>;
   validate: () => boolean;
}

export function useFormWithValidation<T extends object>({
   initialData,
   validatorConfig,
}: UseFormWithValidationParams<T>): UseFormWithValidationReturnType<T> {
   const { data, changeHandler } = useForm({ initialData });

   const [errors, setErrors] = useState<ValidationErrors<T>>({});

   const validate = (): boolean => {
      if (!validatorConfig) return false;
      const errors = validator(data, validatorConfig);
      setErrors(errors);
      return Object.keys(errors).length !== 0;
   };

   useEffect(() => {
      validate();
   }, [data]);

   return { data, changeHandler, errors, validate };
}

interface UseFormParams<T extends object> {
   initialData: T;
}

interface UseFormReturnType<T extends object> {
   data: T;
   changeHandler: (partialData: Partial<T> | ChangeHandlerFN<T>) => void;
}

export type ChangeHandlerFN<T extends object> = (prevData: T) => T;

export function useForm<T extends object>({ initialData }: UseFormParams<T>): UseFormReturnType<T> {
   const [data, setData] = useState(initialData);

   const changeHandler = (partialData: Partial<T> | ChangeHandlerFN<T>): void => {
      if (typeof partialData === "function") {
         setData(partialData);
      } else {
         setData((prevData) => ({
            ...prevData,
            ...partialData,
         }));
      }
   };

   return { data, changeHandler };
}
