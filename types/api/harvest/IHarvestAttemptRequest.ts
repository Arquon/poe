import { IHarvestAttempt } from "../../harvest/IHarvestAttempt";

export type IHarvestAttemptCreateRequest = Omit<IHarvestAttempt, "id" | "userId">;
export type IHarvestAttemptNew = Omit<IHarvestAttempt, "id">;
export type IHarvestAttemptUpdateRequest = Omit<IHarvestAttempt, "userId">;
