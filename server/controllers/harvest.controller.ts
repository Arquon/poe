import { IHarvestStorage } from "@/types/storage/IHarvestStorage";
import { IHarvestAttempt } from "@@@/types/harvest/IHarvestRunAttempt";
import { IHarvestAttemptResponse } from "@@@/types/api/harvest/IHarvestAttemptResponse";
import { IHarvestAttemptListResponse } from "@@@/types/api/harvest/IHarvestAttemptListResponse";
import { IHarvestAttemptNew, IHarvestAttemptNewRequest, IHarvestAttemptRequest } from "@@@/types/api/harvest/IHarvestAttemptRequest";
import { HarvestStorageDb } from "@/db/storage/harvest.storage";
import { DatabaseError } from "pg";
import createError from "http-errors";
import { IDeleteResponse } from "@@@/types/api/IDeleteResponse";
import { Request, Response } from "express";
import createHttpError from "http-errors";

interface IHarvestController {
   createAttempt: (req: Request<{}, {}, IHarvestAttemptNewRequest>, res: Response<IHarvestAttemptResponse>) => Promise<void>;
   getAttempts: (req: Request, res: Response<IHarvestAttemptListResponse>) => Promise<void>;
   getSingleAttempt: (req: Request<{ id: string }>, res: Response<IHarvestAttemptResponse>) => Promise<void>;
   updateAttempt: (req: Request<{}, {}, IHarvestAttemptRequest>, res: Response<IHarvestAttemptResponse>) => Promise<void>;
   deleteAttempt: (req: Request<{ id: string }>, res: Response<IDeleteResponse>) => Promise<void>;
}

class HarvestController implements IHarvestController {
   private harvestStorage: IHarvestStorage;

   constructor(harvestStorage: IHarvestStorage) {
      this.harvestStorage = harvestStorage;

      this.createAttempt = this.createAttempt.bind(this);
      this.getAttempts = this.getAttempts.bind(this);
      this.getSingleAttempt = this.getSingleAttempt.bind(this);
      this.updateAttempt = this.updateAttempt.bind(this);
      this.deleteAttempt = this.deleteAttempt.bind(this);
   }

   async createAttempt(req: Request<{}, {}, IHarvestAttemptNewRequest>, res: Response<IHarvestAttemptResponse>): Promise<void> {
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
      const attempts = await this.harvestStorage.getAttemptsForUser(userId);
      res.json({ attempts });
   }

   async getSingleAttempt(req: Request, res: Response<IHarvestAttemptResponse>): Promise<void> {
      if (!req.user) throw createHttpError(500, "user id lost: harvest get");

      const { id } = req.params;
      const attempt = await this.harvestStorage.getSingleAttempt(+id);
      if (!attempt) throw createHttpError(404, "ATTEMPT_NOT_FOUND");
      res.json({ attempt });
   }

   async updateAttempt(req: Request<{}, {}, IHarvestAttemptRequest>, res: Response<IHarvestAttemptResponse>): Promise<void> {
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
