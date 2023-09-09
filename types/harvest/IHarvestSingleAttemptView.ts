import { IHarvestMapValuesWithoutId } from "./IHarvestMapValues";
import { IHarvestAttempt } from "./IHarvestAttempt";

export type IHarvestSingleAttemptView = Omit<IHarvestAttempt, "id" | "userId" | "maps"> & {
   maps: IHarvestMapValuesWithoutId[];
};

export type IHarvestAverageAttempt = Omit<IHarvestSingleAttemptView, "note">;

export interface IHarvestAverageAttemptsObj {
   user: IHarvestAverageAttempt | null;
   global: IHarvestAverageAttempt | null;
}
