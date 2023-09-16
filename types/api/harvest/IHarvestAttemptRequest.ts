import { IHarvestAttempt } from "../../harvest/IHarvestAttempt";

export type IHarvestAttemptCreateRequest = Omit<IHarvestAttempt, "id" | "userId" | "createdAt">;
export type IHarvestAttemptCreate = Omit<IHarvestAttempt, "id" | "createdAt">;
export type IHarvestAttemptUpdateRequest = Omit<IHarvestAttempt, "userId" | "createdAt">;
export type IHarvestAttemptUpdate = Omit<IHarvestAttempt, "createdAt">;
