import { type IHarvestSingleAttemptView } from "@@@/types/harvest/IHarvestSingleAttemptView";
import React, { type FC } from "react";
import { HarvestMapsViewBlock } from "./HarvestMapsViewBlock";
import { HarvestPricesViewBlock } from "./HarvestPricesViewBlock";
import { getProfitString } from "@/utils/functions/harvest";
import { TextView } from "@/components/ui/view/TextView";

interface HarvestViewProps {
   attempt: IHarvestSingleAttemptView;
}

export const HarvestView: FC<HarvestViewProps> = ({ attempt }) => {
   const { maps, invitations, prices, note } = attempt;
   const profit = getProfitString(attempt) ?? undefined;

   return (
      <div>
         <HarvestMapsViewBlock maps={maps} />
         <HarvestPricesViewBlock invitations={invitations} prices={prices} profit={profit} />
         {note && <TextView value={note} label="Примечание" />}
      </div>
   );
};
