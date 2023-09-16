import { harvestSyncActions } from "@/store/harvest/slice";
import { useAppSelector, useAppDispatch } from "@/store/store";
import { type IHarvestPrices } from "@@@/types/harvest/IHarvestPrices";
import { useEffect } from "react";
import { type IHarvestAttemptFormCreate, type IHarvestAttemptForm } from "@/form/harvest.form";
import { type THarvestAttemptFormErrors } from "@/form/harvest.validator";
import { type IHarvestAverageAttempt } from "@@@/types/harvest/IHarvestSingleAttemptView";

export type SetHarvestPriceFnType = (price: Partial<IHarvestPrices>) => void;

interface UseHarvestFormReturnType {
   attempt: IHarvestAttemptForm;
   placeHolderAttempt?: IHarvestAverageAttempt | null;
   errors: THarvestAttemptFormErrors;
   setAttemptValues: (attempt: Partial<IHarvestAttemptFormCreate>) => void;
}

export function useHarvestForm(): UseHarvestFormReturnType {
   const { currentAttempt: attempt, attemptErrors: errors, averageAttempts } = useAppSelector((state) => state.harvest);
   const dispatch = useAppDispatch();

   function setAttemptValues(attempt: Partial<IHarvestAttemptFormCreate>): void {
      dispatch(harvestSyncActions.setAttemptValues(attempt));
   }

   useEffect(() => {
      dispatch(harvestSyncActions.validateAttempt());
   }, [attempt]);

   const placeHolderAttempt = averageAttempts?.currentUser.averageAttempt ?? averageAttempts?.global.averageAttempt;

   return { attempt, errors, placeHolderAttempt, setAttemptValues };
}
