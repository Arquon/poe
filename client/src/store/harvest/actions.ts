import { harvestService } from "@/services/harvest.service";
import { harvestNetworkErrorsHandler } from "@/utils/networkErrorHandlers";
import {
   type IHarvestAttemptCreateRequest as IHarvestAttemptNewForm,
   type IHarvestAttemptUpdateRequest as IHarvestAttemptUpdateForm,
} from "@@@/types/api/harvest/IHarvestAttemptRequest";
import { type IHarvestAverageAttemptsObj } from "@@@/types/harvest/IHarvestSingleAttemptView";
import { type IHarvestAttempt, type IHarvestAttemptViewInfo } from "@@@/types/harvest/IHarvestAttempt";
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

const getAttempts = createAsyncThunk<IHarvestAttemptViewInfo, number, { rejectValue: string }>(
   "harvest/getAll",
   async function (page, { rejectWithValue }) {
      try {
         const attempts = await harvestService.getUserAttempts(page);
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
         const parsedError = harvestNetworkErrorsHandler(error, {
            _404: { attemptNotFound: "Попытка не найдена" },
         });
         return rejectWithValue(parsedError);
      }
   }
);

const getAverageAttempts = createAsyncThunk<IHarvestAverageAttemptsObj, undefined, { rejectValue: string }>(
   "harvest/getAverages",
   async function (_, { rejectWithValue }) {
      try {
         const attempts = await harvestService.getAverageAttempts();
         return attempts;
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

const deleteAttempt = createAsyncThunk<number, number, { rejectValue: string }>(
   "harvest/delete",
   async function (attemptId, { rejectWithValue, dispatch }) {
      try {
         const id = await harvestService.deleteAttempt(attemptId);
         return id;
      } catch (error) {
         const parsedError = harvestNetworkErrorsHandler(error);
         return rejectWithValue(parsedError);
      }
   }
);

const harvestAsyncActions = {
   addAttempt,
   getSingleAttempt,
   getAttempts,
   getAverageAttempts,
   updateAttempt,
   deleteAttempt,
};

export { addAttempt, getSingleAttempt, getAttempts, updateAttempt, deleteAttempt, getAverageAttempts };
export default harvestAsyncActions;
