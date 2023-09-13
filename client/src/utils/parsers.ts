import { type IHarvestAttempt, type IHarvestAttemptView } from "@@@/types/harvest/IHarvestAttempt";

export const getAttemptViewFromAttempt = (attempt: IHarvestAttempt): IHarvestAttemptView => ({
   id: attempt.id,
   invitations: attempt.invitations,
   prices: attempt.prices,
   total: {
      blue: attempt.maps[3].result.blue,
      red: attempt.maps[3].result.red,
      yellow: attempt.maps[3].result.yellow,
   },
});
