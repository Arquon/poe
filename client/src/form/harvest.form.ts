import {
   type IHarvestAttemptUpdateRequest,
   type IHarvestAttemptCreateRequest,
} from "@@@/types/api/harvest/IHarvestAttemptRequest";
import { type IHarvestMapValues } from "@@@/types/harvest/IHarvestMapValues";
import { type IHarvestPrices } from "@@@/types/harvest/IHarvestPrices";
import { v4 as uuidv4 } from "uuid";

export interface IHarvestAttemptFormCreate extends IHarvestAttemptCreateRequest {
   id?: never;
   userId?: never;
}
export interface IHarvestAttemptFormUpdate extends IHarvestAttemptUpdateRequest {
   userId: number;
}

export type IHarvestAttemptForm = IHarvestAttemptFormCreate | IHarvestAttemptFormUpdate;

export class HarvestFormService {
   static getEmptyAttempt(prices?: IHarvestPrices): IHarvestAttemptForm {
      const attempt: IHarvestAttemptForm = {
         maps: [this.getEmptyMap(1), this.getEmptyMap(2), this.getEmptyMap(3), this.getEmptyMap(4)],
         invitations: 0,
         note: "",
         prices: prices ?? this.getEmptyPrices(),
      };

      return attempt;
   }

   static getEmptyPrices(): IHarvestPrices {
      const prices: IHarvestPrices = {
         yellow: 0,
         blue: 0,
         red: 0,
         memory: 0,
         invitation: 0,
      };
      return prices;
   }

   static getEmptyMap(order: number): IHarvestMapValues {
      const map: IHarvestMapValues = {
         result: { blue: 0, red: 0, yellow: 0 },
         quantity: 0,
         order,
         id: uuidv4(),
      };

      return map;
   }
}
