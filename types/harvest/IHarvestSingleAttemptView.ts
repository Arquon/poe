import { IHarvestMapValuesWithoutId } from "./IHarvestMapValues";
import { IHarvestAttempt } from "./IHarvestAttempt";
import { Nullable } from "@/types/default";

export type IHarvestSingleAttemptView = Omit<IHarvestAttempt, "id" | "userId" | "maps" | "createdAt"> & {
   maps: IHarvestMapValuesWithoutId[];
   createdAt?: string;
};

export type IHarvestAverageAttempt = Omit<IHarvestSingleAttemptView, "note" | "createdAt">;

export interface IHarvestAverageAttemptsObj {
   total: number;
   averageAttempt: Nullable<IHarvestAverageAttempt>;
}
