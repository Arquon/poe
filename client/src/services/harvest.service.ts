import {
   type IHarvestAttemptUpdateRequest,
   type IHarvestAttemptCreateRequest,
} from "@@@/types/api/harvest/IHarvestAttemptRequest";
import { type IHarvestAttemptResponse } from "@@@/types/api/harvest/IHarvestAttemptResponse";
import { type IHarvestAttemptListResponse } from "@@@/types/api/harvest/IHarvestAttemptListResponse";
import { type IDeleteResponse } from "@@@/types/api/IDeleteResponse";
import httpService from "./http.service";
import { type IHarvestAverageAttemptsResponse } from "@@@/types/api/harvest/IHarvestAverageAttemptsResponse";

const harvestEndPoint = "harvest";

export const ATTEMPTS_IN_PAGES = 5;

export const harvestService = {
   addAttempt: async (attempt: IHarvestAttemptCreateRequest) => {
      const { data } = await httpService.post<IHarvestAttemptResponse>(`${harvestEndPoint}`, {
         ...attempt,
      });
      return data.attempt;
   },
   getUserAttempts: async (page: number) => {
      const { data } = await httpService.get<IHarvestAttemptListResponse>(`${harvestEndPoint}`, {
         params: {
            count: ATTEMPTS_IN_PAGES,
            page,
         },
      });
      return data.attemptsInfo;
   },
   getAverageAttempts: async () => {
      const { data } = await httpService.get<IHarvestAverageAttemptsResponse>(`${harvestEndPoint}/average`);
      return data.average;
   },
   getSingleAttempt: async (attemptId: number) => {
      const { data } = await httpService.get<IHarvestAttemptResponse>(`${harvestEndPoint}/attempt/${attemptId}`);
      return data.attempt;
   },
   updateAttempt: async (attempt: IHarvestAttemptUpdateRequest) => {
      const { data } = await httpService.put<IHarvestAttemptResponse>(`${harvestEndPoint}`, {
         ...attempt,
      });
      return data.attempt;
   },
   deleteAttempt: async (attemptId: number) => {
      const { data } = await httpService.delete<IDeleteResponse>(`${harvestEndPoint}/${attemptId}`);
      return data.id;
   },
};
