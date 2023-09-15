import { TextNumericField } from "@/components/ui/form/TextField";
import { type THarvestPricesFormErrors } from "@/form/harvest.validator";
import { type SetHarvestPriceFnType } from "@/hooks/useHarvestForm";
import { type IHarvestPrices } from "@@@/types/harvest/IHarvestPrices";
import React, { type FC } from "react";

interface HarvestPricesFieldsBlockProps {
   prices: IHarvestPrices;
   placeHolderPrices?: IHarvestPrices;
   invitations: number;
   placeHolderInvitations?: number;
   profit?: string;
   setPriceValues: SetHarvestPriceFnType;
   setInvitations: (invitations: number) => void;
   priceErrors: THarvestPricesFormErrors;
   invitationsCountError: boolean | string;
   readOnly?: boolean;
}

export const HarvestPricesFieldsBlock: FC<HarvestPricesFieldsBlockProps> = ({
   prices,
   placeHolderPrices,
   invitations: invitationsCount,
   placeHolderInvitations: placeHolderInvitationsCount,
   priceErrors,
   setPriceValues,
   setInvitations,
   readOnly,
   profit,
}) => {
   const {
      blue: blueError,
      red: redError,
      yellow: yellowError,
      memory: memoryError,
      invitation: invitationPriceError,
   } = priceErrors;
   const { yellow, blue, red, memory, invitation: invitationPrice } = prices;

   const priceInsertHandler = (value: string): string => {
      const test = value.split("Размер стопки: ");
      if (test.length > 1) {
         const parsedValue = test[1].split("/")[0].replaceAll(String.fromCharCode(160), "");
         return parsedValue;
      }

      return value;
   };

   return (
      <>
         <div className="mb-3">
            <div className="row justify-content-between">
               <div className="col-auto">
                  <p>Количество жижи за диван</p>
               </div>
               {profit && (
                  <div className="col-auto">
                     <p>Профит {profit}</p>
                  </div>
               )}
            </div>

            <div className="row">
               <div className="col-4">
                  <TextNumericField
                     value={yellow || ""}
                     placeholder={placeHolderPrices?.yellow}
                     error={yellowError}
                     label="Желтой"
                     onChange={(yellow) => {
                        setPriceValues({ yellow });
                     }}
                     readOnly={readOnly}
                     insertHandler={priceInsertHandler}
                  />
               </div>
               <div className="col-4">
                  <TextNumericField
                     value={blue || ""}
                     placeholder={placeHolderPrices?.blue}
                     error={blueError}
                     label="Синей"
                     onChange={(blue) => {
                        setPriceValues({ blue });
                     }}
                     readOnly={readOnly}
                     insertHandler={priceInsertHandler}
                  />
               </div>
               <div className="col-4">
                  <TextNumericField
                     value={red || ""}
                     placeholder={placeHolderPrices?.red}
                     error={redError}
                     label="Красной"
                     onChange={(red) => {
                        setPriceValues({ red });
                     }}
                     readOnly={readOnly}
                     insertHandler={priceInsertHandler}
                  />
               </div>
            </div>
         </div>
         <div className="row mb-3">
            <div className="col-4">
               <TextNumericField
                  value={memory || ""}
                  placeholder={placeHolderPrices?.memory}
                  error={memoryError}
                  label="Стоимость воспоминания"
                  onChange={(memory) => {
                     console.log({ memory });
                     setPriceValues({ memory });
                  }}
                  readOnly={readOnly}
                  float
               />
            </div>
            <div className="col-4">
               <TextNumericField
                  value={invitationsCount || ""}
                  placeholder={placeHolderInvitationsCount}
                  onChange={(invitations) => {
                     setInvitations(invitations);
                  }}
                  label="Количество приглашений"
                  readOnly={readOnly}
               />
            </div>
            {!!invitationsCount && (
               <div className="col-4">
                  <TextNumericField
                     value={invitationPrice || ""}
                     placeholder={placeHolderPrices?.invitation}
                     error={invitationPriceError}
                     onChange={(invitation) => {
                        setPriceValues({ invitation });
                     }}
                     label="Стоимость приглашения"
                     readOnly={readOnly}
                     float
                  />
               </div>
            )}
         </div>
      </>
   );
};
