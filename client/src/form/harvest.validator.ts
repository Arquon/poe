import { type FormValidationErrors } from "@/types/validator/errorTypes";
import { type IHarvestMapValues } from "@@@/types/harvest/IHarvestMapValues";
import { type IHarvestAttemptForm } from "./harvest.form";
import { type IHarvestPrices } from "@@@/types/harvest/IHarvestPrices";

export type THarvestAttemptFormErrors = FormValidationErrors<IHarvestAttemptForm>;
export type THarvestMapFormErrors = FormValidationErrors<IHarvestMapValues>;
export type THarvestPricesFormErrors = FormValidationErrors<IHarvestPrices>;

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

   static validateMap(map: IHarvestMapValues): THarvestMapFormErrors {
      const errors = this.getMapErrors(map.id);
      errors.result = {
         blue: !map.result.blue,
         red: !map.result.red,
         yellow: !map.result.yellow,
      };
      errors.quantity = !map.quantity;
      return errors;
   }

   static validateAttempt(attempt: IHarvestAttemptForm): THarvestAttemptFormErrors {
      const errors = this.getAttemptErrors(attempt);

      errors.maps = attempt.maps.map((attemptMap) => this.validateMap(attemptMap));
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
