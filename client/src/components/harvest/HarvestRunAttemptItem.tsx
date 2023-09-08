import React, { type FC } from "react";
import { type IHarvestAttemptView } from "@@@/types/harvest/IHarvestRunAttempt";
import { calcProfit } from "@/utils/functions";

interface HarvestRunAttemptItemProps {
   attempt: IHarvestAttemptView;
}

export const HarvestRunAttemptItem: FC<HarvestRunAttemptItemProps> = ({ attempt }) => {
   const { total } = attempt;

   return (
      <div className="card text-white bg-primary px-4 py-2">
         <div className="row">
            <div className="col fs-5">{total.yellow}</div>
            <div className="col fs-5">{total.blue}</div>
            <div className="col fs-5">{total.red}</div>
            <div className="col fs-5">{calcProfit(attempt)}</div>
         </div>
      </div>
   );
};
