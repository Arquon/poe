import { type IHarvestMapLifeForceCount } from "@@@/types/harvest/IHarvestMapValues";
import { type IHarvestPrices } from "@@@/types/harvest/IHarvestPrices";
import { type IHarvestAttemptView } from "@@@/types/harvest/IHarvestAttempt";
import { round } from "./functions";
import { type Nullable } from "@/types/default";
import { type IHarvestSingleAttemptView } from "@@@/types/harvest/IHarvestSingleAttemptView";

interface IHarvestProfit {
   profit: number;
   profitWithInvitations?: number;
}

function calcProfit(
   lifeForce: IHarvestMapLifeForceCount,
   invitationsCount: number,
   prices: IHarvestPrices
): Nullable<IHarvestProfit> {
   const { yellow: yellowCount, blue: blueCount, red: redCount } = lifeForce;
   const {
      yellow: yellowPrice,
      blue: bluePrice,
      red: redPrice,
      invitation: invitationPrice,
      memory: memoryPrice,
   } = prices;

   const profit = yellowCount / yellowPrice + blueCount / bluePrice + redCount / redPrice - memoryPrice;
   if (!isFinite(profit)) return null;

   const profitWithInvitations = invitationsCount ? profit + invitationsCount * invitationPrice : undefined;
   return { profit, profitWithInvitations };
}

export function getProfit(attempt: IHarvestAttemptView | IHarvestSingleAttemptView): Nullable<IHarvestProfit> {
   if ("total" in attempt) {
      return calcProfit(attempt.total, attempt.invitations, attempt.prices);
   }

   return calcProfit(attempt.maps[3].result, attempt.invitations, attempt.prices);
}

export function getProfitString(attempt: IHarvestAttemptView | IHarvestSingleAttemptView): Nullable<string> {
   let profitString = "";
   const profitObject = getProfit(attempt);
   if (!profitObject) return null;
   profitString = `${round(profitObject.profit)}`;
   if (profitObject.profitWithInvitations) {
      profitString += ` (${round(profitObject.profitWithInvitations)})`;
   }

   return profitString;
}
