import { type IHarvestAttemptRequest, type IHarvestAttemptNewRequest } from "@@@/types/api/harvest/IHarvestAttemptRequest";
import { type IHarvestAttemptResponse } from "@@@/types/api/harvest/IHarvestAttemptResponse";
import { type IHarvestAttemptListResponse } from "@@@/types/api/harvest/IHarvestAttemptListResponse";
import { type IDeleteResponse } from "@@@/types/api/IDeleteResponse";
import httpService from "./http.service";

const harvestEndPoint = "harvest";

export const harvestService = {
   addAttempt: async (attempt: IHarvestAttemptNewRequest) => {
      const { data } = await httpService.post<IHarvestAttemptResponse>(`${harvestEndPoint}`, {
         ...attempt,
      });
      return data.attempt;
   },
   getUserAttempts: async () => {
      const { data } = await httpService.get<IHarvestAttemptListResponse>(`${harvestEndPoint}`);
      return data.attempts;
   },
   getSingleAttempt: async (attemptId: number) => {
      const { data } = await httpService.get<IHarvestAttemptResponse>(`${harvestEndPoint}/${attemptId}`);
      return data.attempt;
   },
   updateAttempt: async (attempt: IHarvestAttemptRequest) => {
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
