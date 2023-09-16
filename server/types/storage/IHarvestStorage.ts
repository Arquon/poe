import { IHarvestAttemptCreate, IHarvestAttemptUpdate } from "@@@/types/api/harvest/IHarvestAttemptRequest";
import { IHarvestAttempt, IHarvestAttemptView } from "@@@/types/harvest/IHarvestAttempt";
import { Nullable } from "@/types/default";

import { IArrayWithTotalCount } from "@@@/types/utils/utils";

export interface IGetAttemptsInfo {
   page: number;
   count: number;
}

export interface IHarvestStorage {
   createAttempt(attempt: IHarvestAttemptCreate): Promise<IHarvestAttempt>;
   getUserAttemptsView(userId: number, info: IGetAttemptsInfo): Promise<IArrayWithTotalCount<IHarvestAttemptView>>;
   getUserAttempts(userId: number): Promise<IArrayWithTotalCount<IHarvestAttempt>>;
   getAllAttempts(): Promise<IArrayWithTotalCount<IHarvestAttempt>>;
   getSingleAttempt(attemptId: number): Promise<Nullable<IHarvestAttempt>>;
   updateAttempt(attempt: Nullable<IHarvestAttemptUpdate>): Promise<Nullable<IHarvestAttempt>>;
   deleteAttempt(userId: number, attemptId: number): Promise<Nullable<number>>;
}
