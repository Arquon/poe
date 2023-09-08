import { harvestService } from "@/services/harvest.service";
import { harvestNetworkErrorsHandler } from "@/utils/networkErrorHandlers";
import {
   type IHarvestAttemptNewRequest as IHarvestAttemptNewForm,
   type IHarvestAttemptRequest as IHarvestAttemptUpdateForm,
} from "@@@/types/api/harvest/IHarvestAttemptRequest";
import { type IHarvestAttemptView, type IHarvestAttempt } from "@@@/types/harvest/IHarvestRunAttempt";
import { createAsyncThunk } from "@reduxjs/toolkit";

const addAttempt = createAsyncThunk<IHarvestAttempt, IHarvestAttemptNewForm, { rejectValue: string }>(
   "harvest/add",
   async function (newAttempt, { rejectWithValue }) {
      try {
         const attempt = await harvestService.addAttempt(newAttempt);
         return attempt;
      } catch (error) {
         const parsedError = harvestNetworkErrorsHandler(error);
         return rejectWithValue(parsedError);
      }
   }
);

const getAttempts = createAsyncThunk<IHarvestAttemptView[], undefined, { rejectValue: string }>(
   "harvest/getAll",
   async function (_, { rejectWithValue }) {
      try {
         const attempts = await harvestService.getUserAttempts();
         return attempts;
      } catch (error) {
         const parsedError = harvestNetworkErrorsHandler(error);
         return rejectWithValue(parsedError);
      }
   }
);

const getSingleAttempt = createAsyncThunk<IHarvestAttempt, number, { rejectValue: string }>(
   "harvest/getSingle",
   async function (attemptId, { rejectWithValue }) {
      try {
         const attempt = await harvestService.getSingleAttempt(attemptId);
         return attempt;
      } catch (error) {
         const parsedError = harvestNetworkErrorsHandler(error);
         return rejectWithValue(parsedError);
      }
   }
);

const updateAttempt = createAsyncThunk<IHarvestAttempt, IHarvestAttemptUpdateForm, { rejectValue: string }>(
   "harvest/update",
   async function (newAttempt, { rejectWithValue }) {
      try {
         const attempt = await harvestService.updateAttempt(newAttempt);
         return attempt;
      } catch (error) {
         const parsedError = harvestNetworkErrorsHandler(error);
         return rejectWithValue(parsedError);
      }
   }
);

const deleteAttempt = createAsyncThunk<number, number, { rejectValue: string }>("harvest/delete", async function (attemptId, { rejectWithValue }) {
   try {
      const id = await harvestService.deleteAttempt(attemptId);
      return id;
   } catch (error) {
      const parsedError = harvestNetworkErrorsHandler(error);
      return rejectWithValue(parsedError);
   }
});

const harvestActions = {
   addAttempt,
   getSingleAttempt,
   getAttempts,
   updateAttempt,
   deleteAttempt,
};

export { addAttempt, getSingleAttempt, getAttempts, updateAttempt, deleteAttempt };
export default harvestActions;
