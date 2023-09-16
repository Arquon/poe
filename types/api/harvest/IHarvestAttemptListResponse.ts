import { IHarvestAttemptView } from "@@@/types/harvest/IHarvestAttempt";
import { IArrayWithTotalCount } from "@@@/types/utils/utils";

export interface IHarvestAttemptListResponse {
   attemptsInfo: IArrayWithTotalCount<IHarvestAttemptView>;
}
