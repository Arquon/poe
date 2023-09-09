import { type PartialRecord } from "@/types/default";

export type ValidationErrors<T> = PartialRecord<keyof T, string>;

export type FormValidationErrors<T> = {
   [K in keyof T]: K extends "id"
      ? string
      : T[K] extends any[]
      ? Array<FormValidationErrors<T[K][0]>>
      : T[K] extends object
      ? FormValidationErrors<T[K]>
      : boolean | string;
};
