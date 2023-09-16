import { type IHarvestMapValuesWithoutId } from "@@@/types/harvest/IHarvestMapValues";
import React, { type FC } from "react";
import { HarvestMapView } from "./HarvestMapView";
import { getLocaleDateTimeString } from "@/utils/functions/functions";

interface HarvestMapsViewBlockProps {
   maps: IHarvestMapValuesWithoutId[];
   createdAt?: string;
}

export const HarvestMapsViewBlock: FC<HarvestMapsViewBlockProps> = ({ maps, createdAt }) => {
   const [firstMap, secondMap, thirdMap, fourthMap] = [...maps].sort((a, b) => a.order - b.order);

   return (
      <>
         <div className="row mb-3">
            <div className="col-2">
               <span className="fs-6 fw-bolder text-secondary">{getLocaleDateTimeString(createdAt)}</span>
            </div>
            <div className="row col-10">
               <div className="col-3 text-center">Желтая жижа</div>
               <div className="col-3 text-center">Синяя жижа</div>
               <div className="col-3 text-center">Красная жижа</div>
               <div className="col-3 text-center">Кванта</div>
            </div>
         </div>
         <div>
            <HarvestMapView map={firstMap} heading="1-я карта" />
            <HarvestMapView map={secondMap} heading="2-я карта" />
            <HarvestMapView map={thirdMap} heading="3-я карта" />
            <HarvestMapView map={fourthMap} heading="4-я карта" />
         </div>
      </>
   );
};
