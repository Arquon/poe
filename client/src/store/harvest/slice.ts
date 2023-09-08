import { createSlice } from "@reduxjs/toolkit";
import { type IHarvestAttempt, type IHarvestAttemptView } from "@@@/types/harvest/IHarvestRunAttempt";
import { type Nullable } from "@/types/default";
import { addAttempt, deleteAttempt, getAttempts, getSingleAttempt, updateAttempt } from "./actions";
import { getAttemptViewFromAttempt } from "@/utils/parsers";

interface IHarvestState {
   attempts: IHarvestAttemptView[];
   currentAttempt: Nullable<IHarvestAttempt>;
}

const initialState: IHarvestState = {
   attempts: [],
   currentAttempt: null,
};

const harvestSlice = createSlice({
   name: "harvest",
   initialState,
   reducers: {},
   extraReducers(builder) {
      builder
         .addCase(addAttempt.fulfilled, (state, action) => {
            const attemptView = getAttemptViewFromAttempt(action.payload);
            state.attempts.push(attemptView);
         })
         .addCase(getAttempts.fulfilled, (state, action) => {
            state.attempts = action.payload;
         })
         .addCase(getSingleAttempt.fulfilled, (state, action) => {
            state.currentAttempt = action.payload;
         })
         .addCase(updateAttempt.fulfilled, (state, action) => {
            const attemptView = getAttemptViewFromAttempt(action.payload);
            state.attempts = state.attempts.map((attempt) => (attempt.id !== attemptView.id ? attempt : attemptView));
            state.currentAttempt = action.payload;
         })
         .addCase(deleteAttempt.fulfilled, (state, action) => {
            state.attempts = state.attempts.filter((attempt) => attempt.id !== action.payload);
         });
   },
});

const { actions, reducer: harvestReducer } = harvestSlice;
export { actions };
export default harvestReducer;
