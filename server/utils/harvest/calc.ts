import { IHarvestAverageAttempt } from "@@@/types/harvest/IHarvestSingleAttemptView";
import { IHarvestMapValues, IHarvestMapValuesWithoutId } from "@@@/types/harvest/IHarvestMapValues";
import { IHarvestAttempt } from "@@@/types/harvest/IHarvestAttempt";
import { Nullable } from "@/types/default";
import { round } from "../functions/common";

interface HarvestAttemptsTotal {
   firstMaps: IHarvestMapValues[];
   secondMaps: IHarvestMapValues[];
   thirdMaps: IHarvestMapValues[];
   fourthMaps: IHarvestMapValues[];
   prices: Omit<IHarvestAttempt["prices"], "invitation">;
   invitations: {
      count: number;
      price: number;
      attempts: number;
   };
}

export function findAverageValues(attempts: IHarvestAttempt[]): Nullable<IHarvestAverageAttempt> {
   const totalLength = attempts.length;

   if (totalLength === 0) return null;

   const initialTotalObject: HarvestAttemptsTotal = {
      firstMaps: [],
      secondMaps: [],
      thirdMaps: [],
      fourthMaps: [],
      prices: {
         blue: 0,
         yellow: 0,
         red: 0,
         memory: 0,
      },
      invitations: {
         count: 0,
         price: 0,
         attempts: 0,
      },
   };

   const { firstMaps, secondMaps, thirdMaps, fourthMaps, invitations, prices } = attempts.reduce<HarvestAttemptsTotal>(
      (acc, attempt: IHarvestAttempt) => {
         acc.firstMaps.push(attempt.maps[0]);
         acc.secondMaps.push(attempt.maps[1]);
         acc.thirdMaps.push(attempt.maps[2]);
         acc.fourthMaps.push(attempt.maps[3]);
         acc.prices.yellow += attempt.prices.yellow;
         acc.prices.blue += attempt.prices.blue;
         acc.prices.red += attempt.prices.red;
         acc.prices.memory += attempt.prices.memory;

         if (attempt.invitations) {
            acc.invitations.count += attempt.invitations;
            acc.invitations.price += attempt.prices.invitation * attempt.invitations;
            acc.invitations.attempts += 1;
         }

         return acc;
      },
      initialTotalObject
   );

   const firstMapAverageValue = findMapAverageValue(firstMaps);
   const secondMapAverageValue = findMapAverageValue(secondMaps);
   const thirdMapAverageValue = findMapAverageValue(thirdMaps);
   const fourthMapAverageValue = findMapAverageValue(fourthMaps);

   const averageAttempt: IHarvestAverageAttempt = {
      maps: [firstMapAverageValue, secondMapAverageValue, thirdMapAverageValue, fourthMapAverageValue],
      prices: {
         yellow: round(prices.yellow / totalLength, 0),
         blue: round(prices.blue / totalLength, 0),
         red: round(prices.red / totalLength, 0),
         memory: round(prices.memory / totalLength),
         invitation: round(invitations.count !== 0 ? invitations.price / invitations.count : 0),
      },
      invitations: round(invitations.count / totalLength),
   };

   return averageAttempt;
}

function findMapAverageValue(attemptsMaps: IHarvestMapValues[], order?: number): IHarvestMapValuesWithoutId {
   const totalLength = attemptsMaps.length;
   const initialMapValues: IHarvestMapValuesWithoutId = {
      result: {
         blue: 0,
         red: 0,
         yellow: 0,
      },
      quantity: 0,
      order: order ?? attemptsMaps[0].order,
   };

   if (totalLength === 0) return initialMapValues;

   const totalMapValues = attemptsMaps.reduce<IHarvestMapValuesWithoutId>((acc, map) => {
      acc.quantity += map.quantity;
      acc.result.yellow += map.result.yellow;
      acc.result.blue += map.result.blue;
      acc.result.red += map.result.red;
      return acc;
   }, initialMapValues);

   const averageMapValues: IHarvestMapValuesWithoutId = {
      result: {
         yellow: round(totalMapValues.result.yellow / totalLength, 0),
         blue: round(totalMapValues.result.blue / totalLength, 0),
         red: round(totalMapValues.result.red / totalLength, 0),
      },
      quantity: round(totalMapValues.quantity / totalLength, 0),
      order: totalMapValues.order,
   };

   return averageMapValues;
}
