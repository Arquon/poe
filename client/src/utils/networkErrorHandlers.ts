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
   _400: {
      default: string;
   };
   unhandled: string;
}

const defaultNetworkErrorsMessages: NetworkErrors = {
   _401: {
      default: "Непредвиденная ошибка 401",
   },
   _404: {
      default: "Непредвиденная ошибка 404",
   },
   _400: {
      default: "Непредвиденная ошибка 400",
   },
   unhandled: "Unhandled Axios Error",
};

export function defaultNetworkErrorsHandler(
   error: unknown,
   defaultErrorMessages: NetworkErrors = defaultNetworkErrorsMessages,
   customErrorMessages?: DeepPartial<NetworkErrors>
): string {
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

      return customErrorMessages?.unhandled ?? defaultErrorMessages.unhandled;
   }

   if (isString(error)) {
      return error;
   }

   return "Unhandled Error";
}

interface HarvestErrors extends NetworkErrors {
   _400: NetworkErrors["_400"] & {
      userNotFound: string;
   };
   _404: NetworkErrors["_404"] & {
      attemptNotFound: string;
   };
}

const defaultHarvestErrorMessages: HarvestErrors = {
   _401: {
      default: "Непредвиденная ошибка 401 Жатва",
   },
   _400: {
      userNotFound: "Пользователь не найден",
      default: "Непредвиденная ошибка 400 Жатва",
   },
   _404: {
      attemptNotFound: "Попытка не найдена или не принадлежит вам",
      default: "Непредвиденная ошибка 404 Жатва",
   },
   unhandled: "Unhandled Axios Error",
};

export function harvestNetworkErrorsHandler(error: unknown, customErrorMessages?: DeepPartial<HarvestErrors>): string {
   if (axios.isAxiosError(error)) {
      if (!error.response) return "Axios Error";
      const {
         status: code,
         data: { message },
      } = error.response;
      if (code === 400) {
         switch (message) {
            default:
               return customErrorMessages?._401?.default ?? defaultHarvestErrorMessages._401.default;
         }
      }
      if (code === 404) {
         switch (message) {
            case "ATTEMPT_NOT_FOUND":
               return customErrorMessages?._404?.attemptNotFound ?? defaultHarvestErrorMessages._404.attemptNotFound;
            default:
               return customErrorMessages?._404?.default ?? defaultHarvestErrorMessages._404.default;
         }
      }
      return customErrorMessages?.unhandled ?? defaultHarvestErrorMessages.unhandled;
   }

   if (isString(error)) {
      return error;
   }

   return "Unhandled Error";
}

export function signInNetworkErrorsHandler(error: unknown): ValidationErrors<IAuthData> | string {
   if (axios.isAxiosError(error)) {
      if (!error.response) throw new Error("Axios Error");
      const { status, data } = error.response;
      const { message } = data;
      const errorObject: ValidationErrors<IAuthData> = {};
      if (status === 400) {
         switch (message) {
            case "INVALID_NICKNAME":
               errorObject.nickname = "Введен некорректный nickname";
               return errorObject;
            case "USER_NOT_FOUND":
               errorObject.nickname = "Пользователь с указанным nickname не зарегистрирован";
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
      const { status, data } = error.response;
      const { message } = data;
      const errorObject: ValidationErrors<IAuthData> = {};
      if (status === 400) {
         switch (message) {
            case "INVALID_NICKNAME":
               errorObject.nickname = "Введен некорректный nickname";
               return errorObject;
            case "USER_EXISTS":
               errorObject.nickname = "Пользователь с указанным nickname уже зарегистрирован";
               return errorObject;
            default:
               return "Непредвиденная ошибка";
         }
      }
      return "Unhandled Axios Error";
   }
   return "Unhandled Error";
}
