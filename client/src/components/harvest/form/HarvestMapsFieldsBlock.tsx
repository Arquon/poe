import { type IHarvestMapValues, type IHarvestMapValuesWithoutId } from "@@@/types/harvest/IHarvestMapValues";
import React, { type FC } from "react";
import { HarvestMapFields } from "./HarvestMapFields";
import { type THarvestMapFormErrors } from "@/form/harvest.validator";

interface HarvestMapsFieldsBlockProps {
   setMapValues: (map: Partial<IHarvestMapValues>, order: number) => void;
   maps: IHarvestMapValues[];
   placeHolderMaps?: IHarvestMapValuesWithoutId[];
   errors: THarvestMapFormErrors[];
   readonly?: boolean;
}

export const HarvestMapsFieldsBlock: FC<HarvestMapsFieldsBlockProps> = ({
   setMapValues,
   placeHolderMaps,
   maps,
   errors,
   readonly,
}) => {
   const [firstMap, secondMap, thirdMap, fourthMap] = [...maps].sort((a, b) => a.order - b.order);
   const [phFirstMap, phSecondMap, phThirdMap, phFourthMap] = placeHolderMaps
      ? [...placeHolderMaps].sort((a, b) => a.order - b.order)
      : [undefined, undefined, undefined, undefined];
   const firstMapErrors = errors.find((error) => error.id === firstMap.id);
   const secondMapErrors = errors.find((error) => error.id === secondMap.id);
   const thirdMapErrors = errors.find((error) => error.id === thirdMap.id);
   const fourthMapErrors = errors.find((error) => error.id === fourthMap.id);

   return (
      <>
         <div className="row mb-3">
            <div className="col-2"></div>
            <div className="row col-10">
               <div className="col-3 text-center">Желтая жижа</div>
               <div className="col-3 text-center">Синяя жижа</div>
               <div className="col-3 text-center">Красная жижа</div>
               <div className="col-3 text-center">Кванта</div>
            </div>
         </div>
         <div>
            <HarvestMapFields
               errors={firstMapErrors}
               setMapValues={(map) => {
                  setMapValues(map, 1);
               }}
               map={firstMap}
               placeHolderMap={phFirstMap}
               heading="1-я карта"
               readonly={readonly}
            />
            <HarvestMapFields
               errors={secondMapErrors}
               setMapValues={(map) => {
                  setMapValues(map, 2);
               }}
               map={secondMap}
               placeHolderMap={phSecondMap}
               heading="2-я карта"
               readonly={readonly}
            />
            <HarvestMapFields
               errors={thirdMapErrors}
               setMapValues={(map) => {
                  setMapValues(map, 3);
               }}
               map={thirdMap}
               placeHolderMap={phThirdMap}
               heading="3-я карта"
               readonly={readonly}
            />
            <HarvestMapFields
               errors={fourthMapErrors}
               setMapValues={(map) => {
                  setMapValues(map, 4);
               }}
               map={fourthMap}
               placeHolderMap={phFourthMap}
               heading="4-я карта"
               readonly={readonly}
            />
         </div>
      </>
   );
};
