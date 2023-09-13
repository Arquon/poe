import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { type IHarvestAttemptView } from "@@@/types/harvest/IHarvestAttempt";
import { addAttempt, deleteAttempt, getAttempts, getAverageAttempts, getSingleAttempt, updateAttempt } from "./actions";
import { getAttemptViewFromAttempt } from "@/utils/parsers";
import { HarvestFormService, type IHarvestAttemptFormCreate, type IHarvestAttemptForm } from "@/form/harvest.form";
import { HarvestValidatorService, type THarvestAttemptFormErrors } from "@/form/harvest.validator";
import { type Nullable } from "@/types/default";
import { type IHarvestAverageAttemptsObj } from "@@@/types/harvest/IHarvestSingleAttemptView";

interface IHarvestState {
   attempts: IHarvestAttemptView[];
   currentAttempt: IHarvestAttemptForm;
   averageAttempts: Nullable<IHarvestAverageAttemptsObj>;
   attemptErrors: THarvestAttemptFormErrors;
   total: number;
}

const harvestSlice = createSlice({
   name: "harvest",
   initialState: () => {
      const currentAttempt = HarvestFormService.getEmptyAttempt();
      const attemptErrors = HarvestValidatorService.getAttemptErrors(currentAttempt);

      const initialState: IHarvestState = {
         attempts: [],
         currentAttempt,
         attemptErrors,
         total: 0,
         averageAttempts: null,
      };

      return initialState;
   },
   reducers: {
      setAttemptErrors(state, action: PayloadAction<Partial<THarvestAttemptFormErrors>>) {
         state.attemptErrors = {
            ...state.attemptErrors,
            ...action.payload,
         };
      },
      setAttemptValues(state, action: PayloadAction<Partial<IHarvestAttemptFormCreate>>) {
         state.currentAttempt = {
            ...state.currentAttempt,
            ...action.payload,
         };
      },
      validateAttempt(state) {
         const errors = HarvestValidatorService.validateAttempt(state.currentAttempt);
         state.attemptErrors = errors;
      },
      resetAttempt(state) {
         const currentAttempt = HarvestFormService.getEmptyAttempt(state.attempts[0]?.prices);
         state.currentAttempt = currentAttempt;
         state.attemptErrors = HarvestValidatorService.getAttemptErrors(currentAttempt);
      },
   },
   extraReducers(builder) {
      builder
         .addCase(addAttempt.fulfilled, (state, action) => {
            const attemptView = getAttemptViewFromAttempt(action.payload);
            state.attempts.unshift(attemptView);
            const currentAttempt = HarvestFormService.getEmptyAttempt(state.attempts[0]?.prices);
            state.currentAttempt = currentAttempt;
            state.attemptErrors = HarvestValidatorService.getAttemptErrors(currentAttempt);
         })
         .addCase(getAttempts.fulfilled, (state, action) => {
            state.attempts = action.payload.attempts;
            state.total = action.payload.total;
         })
         .addCase(getSingleAttempt.fulfilled, (state, action) => {
            state.currentAttempt = action.payload;
            state.attemptErrors = HarvestValidatorService.getAttemptErrors(action.payload);
         })
         .addCase(updateAttempt.fulfilled, (state, action) => {
            const attemptView = getAttemptViewFromAttempt(action.payload);
            state.attempts = state.attempts.map((attempt) => (attempt.id !== attemptView.id ? attempt : attemptView));
            state.currentAttempt = action.payload;
            state.attemptErrors = HarvestValidatorService.getAttemptErrors(action.payload);
         })
         .addCase(deleteAttempt.fulfilled, (state, action) => {})
         .addCase(getAverageAttempts.fulfilled, (state, action) => {
            state.averageAttempts = action.payload;
         });
   },
});

const { actions: harvestSyncActions, reducer: harvestReducer } = harvestSlice;
export { harvestSyncActions };
export default harvestReducer;
