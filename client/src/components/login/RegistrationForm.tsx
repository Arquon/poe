import { useFormWithValidation } from "@/hooks/useForm";
import { type TValidator } from "@/utils/validator/validator";
import React, { type FormEvent, type FC } from "react";
import { TextField } from "../ui/form/TextField";
import { useNetworkErrors } from "@/hooks/useNetworkErrors";
import { useNavigate } from "react-router-dom";
import userActions from "@/store/user/actions";
import { useAppDispatch } from "@/store/store";
import { unwrapResult } from "@reduxjs/toolkit";
import { type IAuthData } from "@@@/types/auth/IAuthData";
import { Button } from "../ui/Button";

interface RegistrationFormState extends IAuthData {
   passwordRepeat: string;
}

const initialData: RegistrationFormState = {
   nickname: "",
   password: "",
   passwordRepeat: "",
};

const validatorConfig: TValidator<RegistrationFormState> = {
   nickname: {
      isRequired: {
         message: "Введите nickname",
      },
      latinaAndNumeric: {
         message: "Nickname должен состоять из букв латинского алфавита и цифр",
      },
      minLength: {
         min: 4,
         message: "Минимальная длина nickname 7 символов",
      },
      maxLength: {
         max: 20,
         message: "Максимальная длина nickname 20 символов",
      },
   },
   password: {
      isRequired: {
         message: "Введите пароль",
      },
      latinaAndNumeric: {
         message: "Пароль должен состоять из букв латинского алфавита и цифр",
      },
      minLength: {
         min: 7,
         message: "Минимальная длина пароля 7 символов",
      },
      maxLength: {
         max: 20,
         message: "Максимальная длина пароля 20 символов",
      },
      isCapitalSymbol: {
         message: "Пароль должен содержать хотя бы одну заглавную букву",
      },
      isDigitSymbol: {
         message: "Пароль должен содержать хотя бы одну цифру",
      },
   },
   passwordRepeat: {
      sameAs: {
         message: "Пароли должены совпадать",
         key: "password",
      },
   },
};

interface RegistrationFormProps {}

export const RegistrationForm: FC<RegistrationFormProps> = ({}) => {
   const { data, changeHandler: onChangeHandler, errors } = useFormWithValidation({ initialData, validatorConfig });
   const { networkErrors, networkErrorHandler } = useNetworkErrors(data);
   const dispatch = useAppDispatch();
   const navigate = useNavigate();

   const onSubmitHandler = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
      try {
         event.preventDefault();
         unwrapResult(await dispatch(userActions.register(data)));
         navigate("/");
      } catch (error) {
         networkErrorHandler(error);
      }
   };

   const isError = Object.keys(errors).length !== 0 || Object.keys(networkErrors).length !== 0;

   return (
      <form onSubmit={onSubmitHandler}>
         <div className="mb-3">
            <TextField
               label="Nickname"
               value={data.nickname}
               onChange={(nickname) => {
                  onChangeHandler({ nickname });
               }}
               error={errors.nickname ?? networkErrors.nickname}
            />
            <TextField
               label="Пароль"
               value={data.password}
               onChange={(password) => {
                  onChangeHandler({ password });
               }}
               error={errors.password ?? networkErrors.password}
               type="password"
            />
            <TextField
               label="Повторите пароль"
               value={data.passwordRepeat}
               onChange={(passwordRepeat) => {
                  onChangeHandler({ passwordRepeat });
               }}
               error={errors.passwordRepeat}
               type="password"
            />
         </div>
         <Button className="btn-primary w-100" type="submit" disabled={isError}>
            Зарегистрироваться
         </Button>
      </form>
   );
};
