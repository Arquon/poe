import { type FormValidationErrors } from "@/types/validator/errorTypes";
import { type IHarvestMapLifeForceCount, type IHarvestMapValues } from "@@@/types/harvest/IHarvestMapValues";
import { type IHarvestAttemptForm } from "./harvest.form";
import { type IHarvestPrices } from "@@@/types/harvest/IHarvestPrices";

export type THarvestAttemptFormErrors = FormValidationErrors<IHarvestAttemptForm>;
export type THarvestMapFormErrors = FormValidationErrors<IHarvestMapValues>;
export type THarvestPricesFormErrors = FormValidationErrors<IHarvestPrices>;
export type THarvestMapLifeForceFormErrors = FormValidationErrors<IHarvestMapLifeForceCount>;

export class HarvestValidatorService {
   static getAttemptErrors(attempt: IHarvestAttemptForm): THarvestAttemptFormErrors {
      const errors: THarvestAttemptFormErrors = {
         maps: [
            this.getMapErrors(attempt.maps[0].id),
            this.getMapErrors(attempt.maps[1].id),
            this.getMapErrors(attempt.maps[2].id),
            this.getMapErrors(attempt.maps[3].id),
         ],
         prices: {
            yellow: false,
            blue: false,
            red: false,
            memory: false,
            invitation: false,
         },
         invitations: false,
         note: false,
      };

      return errors;
   }

   static getMapErrors(id: string): THarvestMapFormErrors {
      const errors: THarvestMapFormErrors = {
         quantity: false,
         result: {
            blue: false,
            red: false,
            yellow: false,
         },
         order: false,
         id,
      };

      return errors;
   }

   static validateMapValues(
      currentMap: IHarvestMapLifeForceCount,
      previousMap: IHarvestMapLifeForceCount
   ): THarvestMapLifeForceFormErrors {
      const errors: THarvestMapLifeForceFormErrors = {
         yellow: currentMap.yellow < previousMap.yellow,
         blue: currentMap.blue < previousMap.blue,
         red: currentMap.red < previousMap.red,
      };

      return errors;
   }

   static validateMap(mapToValidate: IHarvestMapValues, maps: IHarvestMapValues[]): THarvestMapFormErrors {
      const errors = this.getMapErrors(mapToValidate.id);

      if (mapToValidate.order !== 1) {
         const previousMap = maps.find((map) => map.order === mapToValidate.order - 1);
         if (previousMap) errors.result = this.validateMapValues(mapToValidate.result, previousMap.result);
      }

      errors.quantity = !mapToValidate.quantity;
      return errors;
   }

   static validateAttempt(attempt: IHarvestAttemptForm): THarvestAttemptFormErrors {
      const errors = this.getAttemptErrors(attempt);

      errors.maps = attempt.maps.map((attemptMap, i, maps) => this.validateMap(attemptMap, maps));
      errors.prices = {
         blue: !attempt.prices.blue,
         red: !attempt.prices.red,
         yellow: !attempt.prices.yellow,
         memory: !attempt.prices.memory,
         invitation: !!attempt.invitations && !attempt.prices.invitation,
      };

      return errors;
   }
}
