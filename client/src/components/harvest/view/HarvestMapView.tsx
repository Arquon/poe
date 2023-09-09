import { NumericView } from "@/components/ui/view/NumericView";
import { type IHarvestMapValuesWithoutId } from "@@@/types/harvest/IHarvestMapValues";
import React, { type FC } from "react";

interface HarvestMapViewProps {
   map: IHarvestMapValuesWithoutId;
   heading: string;
}

export const HarvestMapView: FC<HarvestMapViewProps> = ({ map, heading }) => {
   const { result, quantity } = map;
   const { yellow, blue, red } = result;

   return (
      <div className="row harvest-map">
         <div className="col-2">{heading}</div>
         <div className="col-10 row justify-content-between">
            <div className="col-3">
               <NumericView value={yellow} className="text-center" />
            </div>
            <div className="col-3">
               <NumericView value={blue} className="text-center" />
            </div>
            <div className="col-3">
               <NumericView value={red} className="text-center" />
            </div>
            <div className="col-3">
               <NumericView value={quantity} className="text-center" />
            </div>
         </div>
      </div>
   );
};
