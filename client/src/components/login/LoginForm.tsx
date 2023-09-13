import { useFormWithValidation } from "@/hooks/useForm";
import { type TValidator } from "@/utils/validator/validator";
import React, { type FormEvent, type FC } from "react";
import { TextField } from "../ui/form/TextField";
import { useNetworkErrors } from "@/hooks/useNetworkErrors";
import { unwrapResult } from "@reduxjs/toolkit";
import { useAppDispatch } from "@/store/store";
import userActions from "@/store/user/actions";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/Button";
import { type IAuthData } from "@@@/types/auth/IAuthData";

interface LoginFormProps {}

interface LoginFormState extends IAuthData {}

const initialData: LoginFormState = {
   nickname: "",
   password: "",
};

const validatorConfig: TValidator<LoginFormState> = {
   nickname: {
      isRequired: {
         message: "Введите nickname",
      },
   },
   password: {
      isRequired: {
         message: "Введите пароль",
      },
   },
};

export const LoginForm: FC<LoginFormProps> = ({}) => {
   const { data, changeHandler: onChangeHandler, errors } = useFormWithValidation({ initialData, validatorConfig });
   const { networkErrors, networkErrorHandler } = useNetworkErrors(data);
   const navigate = useNavigate();
   const dispatch = useAppDispatch();

   const onSubmitHandler = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
      try {
         event.preventDefault();
         unwrapResult(await dispatch(userActions.login(data)));
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
               className="mb-3"
            />
            <TextField
               label="Пароль"
               type="password"
               value={data.password}
               onChange={(password) => {
                  onChangeHandler({ password });
               }}
               error={errors.password ?? networkErrors.password}
            />
         </div>
         <Button disabled={isError} className="btn-success w-100">
            Войти
         </Button>
      </form>
   );
};
