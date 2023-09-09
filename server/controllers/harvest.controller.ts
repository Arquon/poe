import { IGetAttemptsInfo, IHarvestStorage } from "@/types/storage/IHarvestStorage";
import { IHarvestAttempt } from "@@@/types/harvest/IHarvestAttempt";
import { IHarvestAttemptResponse } from "@@@/types/api/harvest/IHarvestAttemptResponse";
import { IHarvestAttemptListResponse } from "@@@/types/api/harvest/IHarvestAttemptListResponse";
import { IHarvestAverageAttemptsResponse } from "@@@/types/api/harvest/IHarvestAverageAttemptsResponse";
import { IHarvestAttemptNew, IHarvestAttemptCreateRequest, IHarvestAttemptUpdateRequest } from "@@@/types/api/harvest/IHarvestAttemptRequest";
import { HarvestStorageDb } from "@/db/storage/harvest.storage";
import { DatabaseError } from "pg";
import createError from "http-errors";
import { IDeleteResponse } from "@@@/types/api/IDeleteResponse";
import { Request, Response } from "express";
import createHttpError from "http-errors";
import { IHarvestAverageAttemptsObj } from "@@@/types/harvest/IHarvestSingleAttemptView";
import { findAverageValues } from "@/utils/harvest/calc";

interface IHarvestController {
   createAttempt: (req: Request<{}, {}, IHarvestAttemptCreateRequest>, res: Response<IHarvestAttemptResponse>) => Promise<void>;
   getAttempts: (req: Request, res: Response<IHarvestAttemptListResponse>) => Promise<void>;
   getSingleAttempt: (req: Request<{ id: string }>, res: Response<IHarvestAttemptResponse>) => Promise<void>;
   getAverageAttempts: (req: Request, res: Response<IHarvestAverageAttemptsResponse>) => Promise<void>;
   updateAttempt: (req: Request<{}, {}, IHarvestAttemptUpdateRequest>, res: Response<IHarvestAttemptResponse>) => Promise<void>;
   deleteAttempt: (req: Request<{ id: string }>, res: Response<IDeleteResponse>) => Promise<void>;
}

class HarvestController implements IHarvestController {
   private harvestStorage: IHarvestStorage;

   constructor(harvestStorage: IHarvestStorage) {
      this.harvestStorage = harvestStorage;

      this.createAttempt = this.createAttempt.bind(this);
      this.getAttempts = this.getAttempts.bind(this);
      this.getSingleAttempt = this.getSingleAttempt.bind(this);
      this.getAverageAttempts = this.getAverageAttempts.bind(this);
      this.updateAttempt = this.updateAttempt.bind(this);
      this.deleteAttempt = this.deleteAttempt.bind(this);
   }

   async createAttempt(req: Request<{}, {}, IHarvestAttemptCreateRequest>, res: Response<IHarvestAttemptResponse>): Promise<void> {
      if (!req.user) throw createHttpError(500, "user id lost: harvest create");

      try {
         const attemptToAdd: IHarvestAttemptNew = {
            ...req.body,
            userId: req.user.id,
         };
         const newAttempt = await this.harvestStorage.createAttempt(attemptToAdd);
         res.json({ attempt: newAttempt });
      } catch (error) {
         if (error instanceof DatabaseError) {
            if (error.constraint === "harvest_user_id_fkey") {
               throw createError(400, "USER_NOT_FOUND");
            }
         }
      }
   }

   async getAttempts(req: Request, res: Response<IHarvestAttemptListResponse>): Promise<void> {
      if (!req.user) throw createHttpError(500, "user id lost: harvest get");
      const { id: userId } = req.user;
      const { count, page } = req.query;
      const info: IGetAttemptsInfo = {
         count: typeof count === "string" ? +count : 20,
         page: typeof page === "string" ? +page : 20,
      };
      const data = await this.harvestStorage.getAttemptsForUser(userId, info);
      res.json({ attemptsInfo: data });
   }

   async getSingleAttempt(req: Request, res: Response<IHarvestAttemptResponse>): Promise<void> {
      if (!req.user) throw createHttpError(500, "user id lost: harvest get");

      const { id } = req.params;
      const attempt = await this.harvestStorage.getSingleAttempt(+id);
      if (!attempt) throw createHttpError(404, "ATTEMPT_NOT_FOUND");
      res.json({ attempt });
   }

   async getAverageAttempts(req: Request, res: Response<IHarvestAverageAttemptsResponse>): Promise<void> {
      if (!req.user) throw createHttpError(500, "user id lost: harvest delete");

      const { id: userId } = req.user;
      const attempts = await this.harvestStorage.getAllAttempts();
      const userAttempts = attempts.filter((attempt) => attempt.userId === userId);

      const average: IHarvestAverageAttemptsObj = {
         user: findAverageValues(userAttempts),
         global: findAverageValues(attempts),
      };

      res.json({ average });
   }

   async updateAttempt(req: Request<{}, {}, IHarvestAttemptUpdateRequest>, res: Response<IHarvestAttemptResponse>): Promise<void> {
      if (!req.user) throw createHttpError(500, "user id lost: harvest update");

      const attemptToUpdate: IHarvestAttempt = {
         ...req.body,
         userId: req.user.id,
      };

      const updatedAttempt = await this.harvestStorage.updateAttempt(attemptToUpdate);
      if (!updatedAttempt) throw createHttpError(404, "ATTEMPT_NOT_FOUND");
      res.json({ attempt: updatedAttempt });
   }

   async deleteAttempt(req: Request, res: Response<IDeleteResponse>): Promise<void> {
      if (!req.user) throw createHttpError(500, "user id lost: harvest delete");
      const { id: userId } = req.user;
      const { id } = req.params;
      const deletedId = await this.harvestStorage.deleteAttempt(userId, +id);
      if (!deletedId) throw createHttpError(404, "ATTEMPT_NOT_FOUND");
      res.json({ id: deletedId });
   }
}

const harvestStorageDb = new HarvestStorageDb();
const harvestController = new HarvestController(harvestStorageDb);
export default harvestController;
