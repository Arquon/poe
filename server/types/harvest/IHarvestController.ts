import { IHarvestPrices } from "@@@/types/harvest/IHarvestPrices";
import { IHarvestRunAttemptNew, IHarvestRunAttempt } from "@@@/types/harvest/IHarvestRunAttempt";

export interface ILifeForceStorage {
   addAttempt: (attempt: IHarvestRunAttemptNew, lastPrices: IHarvestPrices) => Promise<void>;
   getAttempts: () => Promise<IHarvestRunAttempt[]>;
}
