import { type IHarvestAttemptView } from "@@@/types/harvest/IHarvestRunAttempt";
import { toast } from "react-toastify";

export function calcProfit(attempt: IHarvestAttemptView): number {
   const { prices, total } = attempt;
   const { yellow: yellowPrice, blue: bluePrice, red: redPrice } = prices;
   const { yellow: yellowTotal, blue: blueTotal, red: redTotal } = total;
   const profit = yellowTotal / yellowPrice + blueTotal / bluePrice + redTotal / redPrice;

   return profit;
}

export function getClassNameFromArray(classes: string[]): undefined | string {
   if (classes.length === 0) return undefined;
   return classes.join(" ");
}

export function toastSuccess(message: string): void {
   toast.success(message, { autoClose: 3000 });
}

export function toastError(error: unknown): void {
   if (typeof error === "string") {
      toast.error(error, { autoClose: 3000 });
   }
}
