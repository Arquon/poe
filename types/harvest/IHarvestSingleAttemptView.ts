import { IHarvestMapValuesWithoutId } from "./IHarvestMapValues";
import { IHarvestAttempt } from "./IHarvestAttempt";

export type IHarvestSingleAttemptView = Omit<IHarvestAttempt, "id" | "userId" | "maps" | "createdAt"> & {
   maps: IHarvestMapValuesWithoutId[];
   createdAt?: string;
};

export type IHarvestAverageAttempt = Omit<IHarvestSingleAttemptView, "note" | "createdAt"> & { attemptsCount: number };

export interface IHarvestAverageAttemptsObj {
   currentUser: IHarvestAverageAttempt | null;
   global: IHarvestAverageAttempt | null;
}
