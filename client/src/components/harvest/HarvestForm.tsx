import React, { type FormEvent, type FC, useState, useMemo } from "react";
import { type IHarvestAttemptNewRequest as IHarvestAttemptNewForm } from "@@@/types/api/harvest/IHarvestAttemptRequest";
import { type ChangeHandlerFN, useForm } from "@/hooks/useForm";
// import { TextField } from "../ui/form/TextField";
import { HarvestMapFields } from "./HarvestMapFields";
import { type THarvestAttemptsMaps, type IHarvestMapValues } from "@@@/types/harvest/IHarvestMapValues";
import { Button } from "../ui/Button";
import { TextNumericField } from "../ui/form/TextField";
import { useNetworkErrors } from "@/hooks/useNetworkErrors";
import { TextareaField } from "../ui/form/TextareaField";

interface HarvestFormProps {
   initialData?: IHarvestAttemptNewForm;
   onSubmit: (data: IHarvestAttemptNewForm) => Promise<void>;
   buttonText: string;
   readOnly?: boolean;
}

const defaultData: IHarvestAttemptNewForm = {
   invitations: 0,
   note: "",
   maps: [
      {
         quantity: 0,
         result: {
            yellow: 0,
            blue: 0,
            red: 0,
         },
         order: 1,
      },
      {
         quantity: 0,
         result: {
            yellow: 0,
            blue: 0,
            red: 0,
         },
         order: 2,
      },
      {
         quantity: 0,
         result: {
            yellow: 0,
            blue: 0,
            red: 0,
         },
         order: 3,
      },
      {
         quantity: 0,
         result: {
            yellow: 0,
            blue: 0,
            red: 0,
         },
         order: 4,
      },
   ],
   prices: {
      yellow: 0,
      blue: 0,
      red: 0,
      memory: 0,
      invitation: 0,
   },
};

interface IHarvestFormErrors {
   firstMap: boolean;
   secondMap: boolean;
   thirdMap: boolean;
   fourthMap: boolean;
}

const defaultErrors: IHarvestFormErrors = {
   firstMap: true,
   secondMap: true,
   thirdMap: true,
   fourthMap: true,
};

export const HarvestForm: FC<HarvestFormProps> = ({ onSubmit, initialData, buttonText, readOnly }) => {
   const { data, changeHandler } = useForm({
      initialData: initialData ?? defaultData,
   });
   const { networkErrorHandler } = useNetworkErrors(data);

   const [harvestErrors, setHarvestErrors] = useState<IHarvestFormErrors>(defaultErrors);

   const mapChangeHandler = (changeMap: ChangeHandlerFN<IHarvestMapValues>, order: number): void => {
      changeHandler((prevData) => {
         const updatedMaps: IHarvestMapValues[] = prevData.maps.map((prevMap) =>
            order === prevMap.order
               ? {
                    ...changeMap(prevMap),
                 }
               : prevMap
         );

         const attempt: IHarvestAttemptNewForm = {
            ...prevData,
            maps: updatedMaps as THarvestAttemptsMaps,
         };
         return attempt;
      });
   };

   const mapSetErrors = (mapErrors: Partial<IHarvestFormErrors>): void => {
      setHarvestErrors((prevErrors) => ({
         ...prevErrors,
         ...mapErrors,
      }));
   };

   const onSubmitHandler = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
      event.preventDefault();
      try {
         await onSubmit(data);
      } catch (error) {
         networkErrorHandler(error);
      }
   };

   const [firstMap, secondMap, thirdMap, fourthMap] = [...data.maps].sort((a, b) => a.order - b.order);

   const disabledButton = useMemo(() => {
      for (const error of Object.values(harvestErrors) as boolean[]) {
         if (error) return true;
      }
      return false;
   }, [harvestErrors]);

   return (
      <form onSubmit={onSubmitHandler}>
         <div className="row mb-3">
            <div className="col-2"></div>
            <div className="row col-10">
               <div className="col-3 text-center">Желтая жижа</div>
               <div className="col-3 text-center">Синяя жижа</div>
               <div className="col-3 text-center">Красная жижа</div>
               <div className="col-3 text-center">Кванта</div>
            </div>
         </div>
         <HarvestMapFields
            mapChangeHandler={(changeMap: ChangeHandlerFN<IHarvestMapValues>): void => {
               mapChangeHandler(changeMap, 1);
            }}
            map={firstMap}
            heading="1-я карта"
            mapSetError={(firstMap) => {
               mapSetErrors({ firstMap });
            }}
         />
         <HarvestMapFields
            mapChangeHandler={(changeMap: ChangeHandlerFN<IHarvestMapValues>): void => {
               mapChangeHandler(changeMap, 2);
            }}
            map={secondMap}
            heading="2-я карта"
            mapSetError={(secondMap) => {
               mapSetErrors({ secondMap });
            }}
         />
         <HarvestMapFields
            mapChangeHandler={(changeMap: ChangeHandlerFN<IHarvestMapValues>): void => {
               mapChangeHandler(changeMap, 3);
            }}
            map={thirdMap}
            heading="3-я карта"
            mapSetError={(thirdMap) => {
               mapSetErrors({ thirdMap });
            }}
         />
         <HarvestMapFields
            mapChangeHandler={(changeMap: ChangeHandlerFN<IHarvestMapValues>): void => {
               mapChangeHandler(changeMap, 4);
            }}
            map={fourthMap}
            heading="4-я карта"
            mapSetError={(fourthMap) => {
               mapSetErrors({ fourthMap });
            }}
         />

         <TextNumericField
            value={data.invitations}
            onChange={(invitations) => {
               changeHandler({ invitations });
            }}
            label="Количество приглашений"
            blockClassName="mb-3"
         />

         <TextareaField
            value={data.note}
            onChange={(note) => {
               changeHandler({ note });
            }}
            label="Примечание"
         />

         <div className="row justify-content-center">
            <div className="col-3">
               <Button type="submit" className="btn-secondary" disabled={disabledButton}>
                  {buttonText}
               </Button>
            </div>
         </div>
      </form>
   );
};
