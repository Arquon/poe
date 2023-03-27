import { IHarvestMapValues } from "./IHarvestMapValues";

export interface IHarvestRunAttempt {
   maps: [IHarvestMapValues, IHarvestMapValues, IHarvestMapValues, IHarvestMapValues];
   profit: number;
   id: number;
}

export type IHarvestRunAttemptWithoutId = Omit<IHarvestRunAttempt, "id">;
