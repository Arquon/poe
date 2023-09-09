import React, { type FormEvent, type FC, useMemo } from "react";
import { type IHarvestAttemptCreateRequest as IHarvestAttemptNewForm } from "@@@/types/api/harvest/IHarvestAttemptRequest";
import { Button } from "../../ui/Button";
import { TextareaField } from "../../ui/form/TextareaField";
import { useHarvestForm } from "@/hooks/useHarvestForm";
import { HarvestMapsFieldsBlock } from "./HarvestMapsFieldsBlock";
import { HarvestPricesFieldsBlock } from "./HarvestPricesFieldsBlock";
import { isErrorCheck, toastError } from "@/utils/functions/functions";
import { type IHarvestMapValues } from "@@@/types/harvest/IHarvestMapValues";
import { type IHarvestPrices } from "@@@/types/harvest/IHarvestPrices";
import { getProfitString } from "@/utils/functions/harvest";

interface HarvestFormProps {
   onSubmit?: (data: IHarvestAttemptNewForm) => Promise<void>;
   buttonText: string;
   readOnly?: boolean;
}

export const HarvestForm: FC<HarvestFormProps> = ({ onSubmit, buttonText, readOnly }) => {
   const { attempt, errors, placeHolderAttempt, setAttemptValues } = useHarvestForm();

   function setMapValues(map: Partial<IHarvestMapValues>, order: number): void {
      setAttemptValues({
         maps: attempt.maps.map((attemptMap) => (order === attemptMap.order ? { ...attemptMap, ...map } : attemptMap)),
      });
   }

   function setPriceValues(price: Partial<IHarvestPrices>): void {
      setAttemptValues({
         prices: {
            ...attempt.prices,
            ...price,
         },
      });
   }

   const onSubmitHandler = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
      event.preventDefault();
      if (!onSubmit) return;
      try {
         await onSubmit(attempt);
      } catch (error) {
         toastError(error);
      }
   };

   const profit = getProfitString(attempt) ?? undefined;

   const isError = useMemo(() => {
      const isError = isErrorCheck(errors);
      return isError;
   }, [errors]);

   return (
      <form onSubmit={onSubmitHandler}>
         <HarvestMapsFieldsBlock
            maps={attempt.maps}
            setMapValues={setMapValues}
            errors={errors.maps}
            readonly={readOnly}
            placeHolderMaps={placeHolderAttempt?.maps}
         />

         <HarvestPricesFieldsBlock
            invitations={attempt.invitations}
            placeHolderInvitations={placeHolderAttempt?.invitations}
            prices={attempt.prices}
            placeHolderPrices={placeHolderAttempt?.prices}
            setInvitations={(invitations) => {
               setAttemptValues({ invitations });
            }}
            priceErrors={errors.prices}
            invitationsCountError={errors.invitations}
            setPriceValues={setPriceValues}
            readOnly={readOnly}
            profit={profit}
         />

         <TextareaField
            value={attempt.note || ""}
            onChange={(note) => {
               setAttemptValues({ note });
            }}
            label="Примечание"
            readOnly={readOnly}
         />

         {onSubmit && (
            <div className="row justify-content-center">
               <div className="col-3">
                  <Button type="submit" className="btn-secondary w-100" disabled={isError || readOnly}>
                     {buttonText}
                  </Button>
               </div>
            </div>
         )}
      </form>
   );
};
