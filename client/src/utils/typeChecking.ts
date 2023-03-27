// import { type AxiosError } from "axios";

import { type IObjectWithLength } from "@/types/utils/IObjectWithLength";

// export function isNetworkError(error: unknown): error is AxiosError {
//    return typeof error === "object" && error !== null && "message" in error;
// }

export function isString(value: unknown): value is string {
   return typeof value === "string";
}

export function isObjectWithLength(value: unknown): value is IObjectWithLength {
   return typeof value === "object" && value !== null && "length" in value;
}
