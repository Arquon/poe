import React, { useEffect, type FC, useState } from "react";
import { TextNumericField } from "../ui/form/TextField";
import { type ChangeHandlerFN } from "@/hooks/useForm";
import { type IHarvestMapLifeForceCount, type IHarvestMapValues } from "@@@/types/harvest/IHarvestMapValues";
import { validateHarvestMap } from "@/utils/validator/validateFormFunctions";

interface HarvestMapFieldsProps {
   map: IHarvestMapValues;
   mapChangeHandler: (changeMap: ChangeHandlerFN<IHarvestMapValues>) => void;
   mapSetError: (error: boolean) => void;
   readOnly?: boolean;
   heading: string;
}

export interface IHarvestMapErrors {
   yellow: boolean;
   blue: boolean;
   red: boolean;
   quantity: boolean;
}

const defaultMapLocalErrors: IHarvestMapErrors = {
   yellow: true,
   blue: true,
   red: true,
   quantity: true,
};

export const HarvestMapFields: FC<HarvestMapFieldsProps> = ({ map, mapChangeHandler, mapSetError, readOnly, heading }) => {
   const [mapLocalErrors, setMapLocalErrors] = useState(defaultMapLocalErrors);

   const { result, quantity } = map;
   const { yellow, blue, red } = result;

   const lifeForceChangeHandler = (lifeForce: Partial<IHarvestMapLifeForceCount>): void => {
      mapChangeHandler((prevMap) => ({
         ...prevMap,
         result: {
            ...prevMap.result,
            ...lifeForce,
         },
      }));
   };

   const quantityChangeHandler = (quantity: number): void => {
      mapChangeHandler((prevMap) => ({
         ...prevMap,
         quantity,
      }));
   };

   const mapSetLocalErrors = (errors: Partial<IHarvestMapErrors>): void => {
      setMapLocalErrors((prevErrors) => ({
         ...prevErrors,
         ...errors,
      }));
   };

   useEffect(() => {
      const isError = validateHarvestMap(map);
      mapSetError(isError);
   }, [map]);

   return (
      <div className="row harvest-map">
         <div className="col-2">{heading}</div>
         <div className="col-10 row justify-content-between">
            <div className="col-3">
               <TextNumericField
                  onChange={(yellow) => {
                     lifeForceChangeHandler({ yellow });
                     mapSetLocalErrors({ yellow: !yellow });
                  }}
                  value={yellow || ""}
                  error={mapLocalErrors.yellow}
                  readOnly={readOnly}
               />
            </div>
            <div className="col-3">
               <TextNumericField
                  onChange={(blue) => {
                     lifeForceChangeHandler({ blue });
                     mapSetLocalErrors({ blue: !blue });
                  }}
                  value={blue || ""}
                  error={mapLocalErrors.blue}
                  readOnly={readOnly}
               />
            </div>
            <div className="col-3">
               <TextNumericField
                  onChange={(red) => {
                     lifeForceChangeHandler({ red });
                     mapSetLocalErrors({ red: !red });
                  }}
                  value={red || ""}
                  error={mapLocalErrors.red}
                  readOnly={readOnly}
               />
            </div>
            <div className="col-3">
               <TextNumericField
                  onChange={(quantity) => {
                     quantityChangeHandler(quantity);
                     mapSetLocalErrors({ quantity: !quantity });
                  }}
                  value={quantity || ""}
                  error={mapLocalErrors.quantity}
                  readOnly={readOnly}
               />
            </div>
         </div>
      </div>
   );
};
