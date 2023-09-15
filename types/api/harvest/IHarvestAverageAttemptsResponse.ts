import { IHarvestAverageAttempt, type IHarvestAverageAttemptsObj } from "../../harvest/IHarvestSingleAttemptView";

export interface IHarvestAverageAttemptsResponse {
   average: IHarvestAverageAttemptsObj;
}

export interface IHarvestUserAverageAttemptsResponse {
   user: IHarvestAverageAttempt | null;
}
