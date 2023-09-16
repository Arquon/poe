import { toast } from "react-toastify";

export function getClassNameFromArray(classes: string[]): undefined | string {
   if (classes.length === 0) return undefined;
   return classes.join(" ");
}

export function toastSuccess(message: string): void {
   toast.success(message, { autoClose: 3000, style: { fontSize: 16 } });
}

export function toastError(error: unknown): void {
   if (typeof error === "string") {
      toast.error(error, { autoClose: 3000, style: { fontSize: 16 } });
   }
}

export async function delay(ms: number): Promise<void> {
   await new Promise((resolve, reject) => {
      setTimeout(() => {
         resolve(true);
      }, ms);
   });
}

function checkError(error: unknown): void {
   // console.log({ error });
   if (typeof error === "boolean") {
      if (error) {
         throw true;
      }
   } else if (Array.isArray(error)) {
      error.forEach((subError) => {
         checkError(subError);
      });
   } else if (typeof error === "object" && error !== null) {
      Object.values(error).forEach((errorValue) => {
         checkError(errorValue);
      });
   }
}

export function isErrorCheck(errors: unknown): boolean {
   let isError = false;
   try {
      checkError(errors);
   } catch {
      isError = true;
   }
   return isError;
}

export function round(val: number | string, res: number = 2): number {
   return Math.round(10 ** res * +val) / 10 ** res;
}

export function gap(value: string | number, unit?: string): string {
   return (+value).toLocaleString("ru-RU").replace(",", ".") + (unit ? `\u00A0${unit}` : "");
}

export function getLocaleDateTimeString(timestamp?: string): string {
   if (!timestamp) return "";
   const date = new Date(timestamp);
   const dateString = date.toLocaleDateString("ru");
   const timeString = date.toLocaleTimeString("ru").slice(0, 5);
   return `${dateString} ${timeString}`;
}
