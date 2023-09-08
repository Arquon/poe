import { IHarvestStorage } from "@/types/storage/IHarvestStorage";
import { IHarvestAttemptView, IHarvestAttempt } from "@@@/types/harvest/IHarvestRunAttempt";

import db from "@/db";
import { type THarvestAttemptsMaps } from "@@@/types/harvest/IHarvestMapValues";
import { IHarvestPrices } from "@@@/types/harvest/IHarvestPrices";
import { IHarvestAttemptNew } from "@@@/types/api/harvest/IHarvestAttemptRequest";
import { Nullable } from "@/types/default";

const INSERT_INTO_HARVEST_QUERY = "SELECT * FROM add_harvest_attempt($1, $2, $3, $4, $5)";

const GET_HARVEST_ATTEMPTS_FOR_USER_QUERY = "SELECT * FROM get_harvest_views_attempts_for_user($1)";
const GET_SINGLE_HARVEST_ATTEMPT_QUERY = "SELECT * FROM get_harvest_full_attempt($1)";

const UPDATE_HARVEST_ATTEMPT_QUERY = "SELECT * FROM update_harvest_attempt($1, $2, $3, $4, $5)";
const DELETE_HARVEST_ATTEMPT_QUERY = "SELECT * FROM delete_harvest_attempt($1)";

const CHECK_FOR_USER_HAVE_ATTEMPT = "SELECT * FROM check_for_user_have_attempt($1, $2)";

interface IHarvestAttemptDB {
   id: number;
   user_id: number;
   maps: THarvestAttemptsMaps;
   prices: IHarvestPrices;
   invitations: number;
   note: string;
}

const constructAttempt = (attempt: IHarvestAttemptDB): IHarvestAttempt => ({
   userId: attempt.user_id,
   maps: attempt.maps,
   id: attempt.id,
   prices: attempt.prices,
   invitations: attempt.invitations,
   note: attempt.note,
});

export class HarvestStorageDb implements IHarvestStorage {
   private async checkIfUserHaveAttempt(userId: number, attemptId: number): Promise<boolean> {
      const exists: boolean = (await db.query(CHECK_FOR_USER_HAVE_ATTEMPT, [userId, attemptId])).rows[0].check_for_user_have_attempt;
      return exists;
   }

   async createAttempt(attempt: IHarvestAttemptNew): Promise<IHarvestAttempt> {
      const { maps, prices, userId, invitations, note } = attempt;
      const newAttempt = (await db.query<IHarvestAttemptDB>(INSERT_INTO_HARVEST_QUERY, [userId, maps, prices, invitations, note])).rows[0];
      return constructAttempt(newAttempt);
   }

   async getAttemptsForUser(userId: number): Promise<IHarvestAttemptView[]> {
      const view = (await db.query<IHarvestAttemptView>(GET_HARVEST_ATTEMPTS_FOR_USER_QUERY, [userId])).rows;
      return view;
   }

   async getSingleAttempt(id: number): Promise<Nullable<IHarvestAttempt>> {
      const attemptFromDb = (await db.query<IHarvestAttemptDB>(GET_SINGLE_HARVEST_ATTEMPT_QUERY, [id])).rows[0];
      return constructAttempt(attemptFromDb);
   }

   async updateAttempt(attempt: IHarvestAttempt): Promise<Nullable<IHarvestAttempt>> {
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