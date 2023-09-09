import React, { type FC } from "react";
import { TextNumericField } from "../../ui/form/TextField";
import {
   type IHarvestMapValuesWithoutId,
   type IHarvestMapLifeForceCount,
   type IHarvestMapValues,
} from "@@@/types/harvest/IHarvestMapValues";
import { type FormValidationErrors } from "@/types/validator/errorTypes";

interface HarvestMapFieldsProps {
   map: IHarvestMapValues;
   placeHolderMap?: IHarvestMapValuesWithoutId;
   setMapValues: (map: Partial<IHarvestMapValues>) => void;
   readonly?: boolean;
   heading: string;
   errors?: FormValidationErrors<IHarvestMapValues>;
}

export interface IHarvestMapErrors {
   yellow: boolean;
   blue: boolean;
   red: boolean;
   quantity: boolean;
}

export const HarvestMapFields: FC<HarvestMapFieldsProps> = ({
   map,
   placeHolderMap,
   readonly: readOnly,
   heading,
   errors,
   setMapValues,
}) => {
   const { result, quantity } = map;
   const { yellow, blue, red } = result;

   const yellowError = errors?.result.yellow;
   const blueError = errors?.result.blue;
   const redError = errors?.result.red;
   const quantityError = errors?.quantity;

   const lifeForceChangeHandler = (lifeForce: Partial<IHarvestMapLifeForceCount>): void => {
      setMapValues({
         result: {
            ...result,
            ...lifeForce,
         },
      });
   };

   const quantityChangeHandler = (quantity: number): void => {
      setMapValues({
         quantity,
      });
   };

   return (
      <div className="row harvest-map">
         <div className="col-2">{heading}</div>
         <div className="col-10 row justify-content-between">
            <div className="col-3">
               <TextNumericField
                  onChange={(yellow) => {
                     lifeForceChangeHandler({ yellow });
                  }}
                  value={yellow || ""}
                  placeholder={placeHolderMap ? Math.round(placeHolderMap.result.yellow) : undefined}
                  error={yellowError}
                  readOnly={readOnly}
               />
            </div>
            <div className="col-3">
               <TextNumericField
                  onChange={(blue) => {
                     lifeForceChangeHandler({ blue });
                  }}
                  value={blue || ""}
                  placeholder={placeHolderMap ? Math.round(placeHolderMap.result.blue) : undefined}
                  error={blueError}
                  readOnly={readOnly}
               />
            </div>
            <div className="col-3">
               <TextNumericField
                  onChange={(red) => {
                     lifeForceChangeHandler({ red });
                  }}
                  value={red || ""}
                  placeholder={placeHolderMap ? Math.round(placeHolderMap.result.red) : undefined}
                  error={redError}
                  readOnly={readOnly}
               />
            </div>
            <div className="col-3">
               <TextNumericField
                  onChange={(quantity) => {
                     quantityChangeHandler(quantity);
                  }}
                  placeholder={placeHolderMap ? Math.round(placeHolderMap.quantity) : undefined}
                  value={quantity || ""}
                  error={quantityError}
                  readOnly={readOnly}
               />
            </div>
         </div>
      </div>
   );
};
