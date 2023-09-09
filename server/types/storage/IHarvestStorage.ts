import { IHarvestAttemptNew } from "@@@/types/api/harvest/IHarvestAttemptRequest";
import { IHarvestAttempt, IHarvestAttemptView, IHarvestAttemptViewInfo } from "@@@/types/harvest/IHarvestRunAttempt";
import { Nullable } from "@/types/default";

export interface IGetAttemptsInfo {
   page: number;
   count: number;
}

export interface IHarvestStorage {
   createAttempt(attempt: IHarvestAttemptNew): Promise<IHarvestAttempt>;
   getAttemptsForUser(userId: number, info: IGetAttemptsInfo): Promise<IHarvestAttemptViewInfo>;
   getSingleAttempt(attemptId: number): Promise<Nullable<IHarvestAttempt>>;
   getAllAttempts(): Promise<IHarvestAttempt[]>;
   updateAttempt(attempt: Nullable<IHarvestAttempt>): Promise<Nullable<IHarvestAttempt>>;
   deleteAttempt(userId: number, attemptId: number): Promise<Nullable<number>>;
}
