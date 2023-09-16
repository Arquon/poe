import { type IHarvestAverageAttemptsObj } from "../../harvest/IHarvestSingleAttemptView";

export interface IHarvestUserAndGlobalAverageAttempts {
   currentUser: IHarvestAverageAttemptsObj;
   global: IHarvestAverageAttemptsObj;
}

export interface IHarvestUserAndGlobalAverageAttemptsResponse {
   defaultAverage: IHarvestUserAndGlobalAverageAttempts;
}

export interface IHarvestUserAverageAttemptsResponse {
   user: IHarvestAverageAttemptsObj;
}
