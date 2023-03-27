import { IHarvestPrices } from "@@@/types/harvest/IHarvestPrices";
import { IHarvestRunAttemptWithoutId, IHarvestRunAttempt } from "@@@/types/harvest/IHarvestRunAttempt";

export interface ILifeForceStorage {
   addAttempt: (attempt: IHarvestRunAttemptWithoutId, lastPrices: IHarvestPrices) => Promise<void>;
   getAttempts: () => Promise<IHarvestRunAttempt[]>;
}
