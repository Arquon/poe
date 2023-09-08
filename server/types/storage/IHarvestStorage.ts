import { IHarvestAttemptNew } from "@@@/types/api/harvest/IHarvestAttemptRequest";
import { IHarvestAttempt, IHarvestAttemptView } from "@@@/types/harvest/IHarvestRunAttempt";
import { Nullable } from "@/types/default";

export interface IHarvestStorage {
   createAttempt(attempt: IHarvestAttemptNew): Promise<IHarvestAttempt>;
   getAttemptsForUser(userId: number): Promise<IHarvestAttemptView[]>;
   getSingleAttempt(attemptId: number): Promise<Nullable<IHarvestAttempt>>;
   updateAttempt(attempt: Nullable<IHarvestAttempt>): Promise<Nullable<IHarvestAttempt>>;
   deleteAttempt(userId: number, attemptId: number): Promise<Nullable<number>>;
}
