import { IHarvestAttemptNew } from "@@@/types/api/harvest/IHarvestAttemptRequest";
import { IHarvestAttempt, IHarvestAttemptViewInfo } from "@@@/types/harvest/IHarvestAttempt";
import { Nullable } from "@/types/default";

export interface IGetAttemptsInfo {
   page: number;
   count: number;
}

export interface IHarvestStorage {
   createAttempt(attempt: IHarvestAttemptNew): Promise<IHarvestAttempt>;
   getUserAttemptsView(userId: number, info: IGetAttemptsInfo): Promise<IHarvestAttemptViewInfo>;
   getSingleAttempt(attemptId: number): Promise<Nullable<IHarvestAttempt>>;
   getAllAttempts(): Promise<IHarvestAttempt[]>;
   getUserAllAttempts(nickname: string): Promise<Nullable<IHarvestAttempt[]>>;
   updateAttempt(attempt: Nullable<IHarvestAttempt>): Promise<Nullable<IHarvestAttempt>>;
   deleteAttempt(userId: number, attemptId: number): Promise<Nullable<number>>;
}
