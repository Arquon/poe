import { IHarvestMapLifeForceCount, IHarvestMapValues } from "./IHarvestMapValues";
import { IHarvestPrices } from "./IHarvestPrices";

export interface IHarvestAttempt {
   maps: IHarvestMapValues[];
   prices: IHarvestPrices;
   id: number;
   userId: number;
   invitations: number;
   note: string;
   createdAt: string;
}
export interface IHarvestAttemptView {
   total: IHarvestMapLifeForceCount;
   prices: IHarvestPrices;
   invitations: number;
   id: number;
}
