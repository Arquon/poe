import React, { type FC } from "react";
import { type IHarvestRunAttempt } from "@@@/types/harvest/IHarvestRunAttempt";
import { type IHarvestPrices } from "@@@/types/harvest/IHarvestPrices";

interface HarvestRunAttemptItemProps {
   attempt: IHarvestRunAttempt;
   prices: IHarvestPrices;
}

export const HarvestRunAttemptItem: FC<HarvestRunAttemptItemProps> = ({ attempt, prices }) => {
   const { maps, profit } = attempt;
   const [, , , resultValues] = maps;

   return (
      <div className="card text-white bg-primary px-4 py-2">
         <div className="row">
            <div className="col fs-5">{resultValues.yellowCount}</div>
            <div className="col fs-5">{resultValues.blueCount}</div>
            <div className="col fs-5">{resultValues.redCount}</div>
            <div className="col fs-5">{profit}</div>
         </div>
      </div>
   );
};
