import { type IAuthData } from "@@@/types/auth/IAuthData";
import { type DeepPartial } from "@/types/default";
import { type ValidationErrors } from "@/types/validator/errorTypes";
import axios from "axios";
import { isString } from "./typeChecking";

interface NetworkErrors {
   _401: {
      default: string;
   };
   _404: {
      default: string;
   };
   unhandled: string;
}

function networkErrorsHandler(error: unknown, defaultErrorMessages: NetworkErrors, customErrorMessages?: DeepPartial<NetworkErrors>): string {
   if (axios.isAxiosError(error)) {
      if (!error.response) return "Axios Error";
      const { statusText, status: code } = error.response;
      if (code === 401) {
         switch (statusText) {
            default:
               return customErrorMessages?._401?.default ?? defaultErrorMessages._401.default;
         }
      }
      if (code === 404) {
         switch (statusText) {
            default:
               return customErrorMessages?._404?.default ?? defaultErrorMessages._404.default;
         }
      }
      console.error(error);
      return customErrorMessages?.unhandled ?? defaultErrorMessages.unhandled;
   }

   if (isString(error)) {
      return error;
   }

   console.error(error);
   return "Unhandled Error";
}

const defaultNetworkErrorsMessages: NetworkErrors = {
   _401: {
      default: "Непредвиденная ошибка 401",
   },
   _404: {
      default: "Непредвиденная ошибка 404",
   },
   unhandled: "Unhandled Axios Error",
};

function netWorkErrorsHandlerGenerator(defaultNetworkErrors: NetworkErrors = defaultNetworkErrorsMessages) {
   return function (error: unknown, customErrorMessages?: DeepPartial<NetworkErrors>) {
      return networkErrorsHandler(error, defaultNetworkErrors, customErrorMessages);
   };
}

export const userNetworkErrorsHandler = netWorkErrorsHandlerGenerator();

export function signInNetworkErrorsHandler(error: unknown): ValidationErrors<IAuthData> | string {
   if (axios.isAxiosError(error)) {
      if (!error.response) throw new Error("Axios Error");
      const { code, message }: { code: number; message: string } = error.response.data.error;
      const errorObject: ValidationErrors<IAuthData> = {};
      if (code === 400) {
         switch (message) {
            case "INVALID_EMAIL":
               errorObject.email = "Введен некорректный email";
               return errorObject;
            case "EMAIL_NOT_FOUND":
               errorObject.email = "Пользователь с указанным email не зарегистрирован";
               return errorObject;
            case "INVALID_PASSWORD":
               errorObject.password = "Введен неверный пароль";
               return errorObject;
            default:
               if (message.startsWith("TOO_MANY_ATTEMPTS")) return "Слишком много попыток входа";
               return "Непредвиденная ошибка";
         }
      }
      return "Unhandled Axios Error";
   }
   return "Unhandled Error";
}

export function signUpNetworkErrorsHandler(error: unknown): ValidationErrors<IAuthData> | string {
   if (axios.isAxiosError(error)) {
      if (!error.response) throw new Error("Axios Error");
      const { code, message }: { code: number; message: string } = error.response.data.error;
      const errorObject: ValidationErrors<IAuthData> = {};
      if (code === 400) {
         switch (message) {
            case "INVALID_EMAIL":
               errorObject.email = "Введен некорректный email";
               return errorObject;
            case "EMAIL_EXISTS":
               errorObject.email = "Пользователь с указанным email уже зарегистрирован";
               return errorObject;
            default:
               return "Непредвиденная ошибка";
         }
      }
      return "Unhandled Axios Error";
   }
   return "Unhandled Error";
}
