import { IGetAttemptsInfo, IHarvestStorage } from "@/types/storage/IHarvestStorage";
import { IHarvestAttemptView, IHarvestAttempt, IHarvestAttemptViewInfo } from "@@@/types/harvest/IHarvestAttempt";

import db from "@/db";
import { IHarvestPrices } from "@@@/types/harvest/IHarvestPrices";
import { IHarvestAttemptCreate, IHarvestAttemptUpdate } from "@@@/types/api/harvest/IHarvestAttemptRequest";
import { Nullable } from "@/types/default";
import { IHarvestMapValues } from "@@@/types/harvest/IHarvestMapValues";

const INSERT_INTO_HARVEST_QUERY = "SELECT * FROM add_harvest_attempt($1, $2, $3, $4, $5)";

const GET_HARVEST_ATTEMPTS_FOR_USER_QUERY = "SELECT * FROM get_harvest_views_attempts_for_user($1, $2, $3)";
const GET_SINGLE_HARVEST_ATTEMPT_QUERY = "SELECT * FROM get_harvest_full_attempt($1)";
const GET_ALL_HARVEST_ATTEMPTS_QUERY = "SELECT * FROM get_all_harvest_attempts($1)";
const GET_USER_HARVEST_ATTEMPTS_QUERY =
   "SELECT h.*, u.nickname FROM get_all_harvest_attempts($1) as h right join users as u on h.user_id = u.id where u.nickname = $2";

const UPDATE_HARVEST_ATTEMPT_QUERY = "SELECT * FROM update_harvest_attempt($1, $2, $3, $4, $5)";
const DELETE_HARVEST_ATTEMPT_QUERY = "SELECT * FROM delete_harvest_attempt($1)";

const CHECK_FOR_USER_HAVE_ATTEMPT = "SELECT * FROM check_for_user_have_attempt($1, $2)";

interface IHarvestAttemptDB {
   id: number;
   user_id: number;
   maps: IHarvestMapValues[];
   prices: IHarvestPrices;
   invitations: number;
   note: string;
   created_at: string;
}

interface IHarvestAttemptDBWithNickname extends IHarvestAttemptDB {
   nickname: string;
}

const constructAttempt = (attempt: IHarvestAttemptDB): IHarvestAttempt => ({
   userId: attempt.user_id,
   maps: attempt.maps,
   id: attempt.id,
   prices: attempt.prices,
   invitations: attempt.invitations,
   note: attempt.note,
   createdAt: attempt.created_at,
});

export class HarvestStorageDb implements IHarvestStorage {
   private async checkIfUserHaveAttempt(userId: number, attemptId: number): Promise<boolean> {
      const exists: boolean = (await db.query(CHECK_FOR_USER_HAVE_ATTEMPT, [userId, attemptId])).rows[0].check_for_user_have_attempt;
      return exists;
   }

   async createAttempt(attempt: IHarvestAttemptCreate): Promise<IHarvestAttempt> {
      const { maps, prices, userId, invitations, note } = attempt;
      const newAttempt = (await db.query<IHarvestAttemptDB>(INSERT_INTO_HARVEST_QUERY, [userId, maps, prices, invitations, note])).rows[0];
      return constructAttempt(newAttempt);
   }

   async getUserAttemptsView(userId: number, info: IGetAttemptsInfo): Promise<IHarvestAttemptViewInfo> {
      const view = (await db.query<IHarvestAttemptViewInfo>(GET_HARVEST_ATTEMPTS_FOR_USER_QUERY, [userId, info.count, info.page])).rows[0];
      return { attempts: view.attempts ?? [], total: view.total };
   }

   async getSingleAttempt(id: number): Promise<Nullable<IHarvestAttempt>> {
      const attemptFromDb = (await db.query<IHarvestAttemptDB>(GET_SINGLE_HARVEST_ATTEMPT_QUERY, [id])).rows[0];
      if (attemptFromDb.id === null) return null;
      return constructAttempt(attemptFromDb);
   }

   async getAllAttempts(): Promise<IHarvestAttempt[]> {
      const attemptsFromDb = (await db.query<IHarvestAttemptDB>(GET_ALL_HARVEST_ATTEMPTS_QUERY, [50])).rows;
      const attempts = attemptsFromDb.map((attemptFromDb) => constructAttempt(attemptFromDb));
      return attempts;
   }

   async getUserAllAttempts(nickname: string): Promise<Nullable<IHarvestAttempt[]>> {
      const attemptsFromDb = (await db.query<IHarvestAttemptDBWithNickname>(GET_USER_HARVEST_ATTEMPTS_QUERY, [50, nickname])).rows;
      if (attemptsFromDb.length === 0) return null;
      const attempts = attemptsFromDb.filter((attempt) => attempt.id !== null).map((attemptFromDb) => constructAttempt(attemptFromDb));
      return attempts;
   }

   async updateAttempt(attempt: IHarvestAttemptUpdate): Promise<Nullable<IHarvestAttempt>> {
      const { id, maps, prices, userId, invitations, note } = attempt;
      if (!this.checkIfUserHaveAttempt(userId, id)) return null;

      const updatedAttempt = (await db.query<IHarvestAttemptDB>(UPDATE_HARVEST_ATTEMPT_QUERY, [id, maps, prices, invitations, note])).rows[0];
      return constructAttempt(updatedAttempt);
   }

   async deleteAttempt(userId: number, attemptId: number): Promise<Nullable<number>> {
      if (!this.checkIfUserHaveAttempt(userId, attemptId)) return null;

      const { id } = (await db.query<IHarvestAttemptDB>(DELETE_HARVEST_ATTEMPT_QUERY, [attemptId])).rows[0];
      return id;
   }
}
