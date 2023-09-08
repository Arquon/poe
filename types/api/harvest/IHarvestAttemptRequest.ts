import { IHarvestAttempt } from "../../harvest/IHarvestRunAttempt";

export type IHarvestAttemptNewRequest = Omit<IHarvestAttempt, "id" | "userId">;
export type IHarvestAttemptNew = Omit<IHarvestAttempt, "id">;
export type IHarvestAttemptRequest = Omit<IHarvestAttempt, "userId">;
