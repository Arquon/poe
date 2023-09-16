import { IGetAttemptsInfo, IHarvestStorage } from "@/types/storage/IHarvestStorage";
import { IHarvestAttemptResponse } from "@@@/types/api/harvest/IHarvestAttemptResponse";
import { IHarvestAttemptListResponse } from "@@@/types/api/harvest/IHarvestAttemptListResponse";
import {
   IHarvestUserAndGlobalAverageAttemptsResponse,
   IHarvestUserAndGlobalAverageAttempts,
   IHarvestUserAverageAttemptsResponse,
} from "@@@/types/api/harvest/IHarvestAverageAttemptsResponse";
import {
   IHarvestAttemptCreate,
   IHarvestAttemptCreateRequest,
   IHarvestAttemptUpdate,
   IHarvestAttemptUpdateRequest,
} from "@@@/types/api/harvest/IHarvestAttemptRequest";
import { harvestStorageDb } from "@/db/storage/harvest.storage";
import { DatabaseError } from "pg";
import createError from "http-errors";
import { IDeleteResponse } from "@@@/types/api/IDeleteResponse";
import { Request, Response } from "express";
import createHttpError from "http-errors";
import { IHarvestAverageAttemptsObj } from "@@@/types/harvest/IHarvestSingleAttemptView";
import { findAverageValues } from "@/utils/harvest/calc";
import { IUserStorage } from "@/types/storage/IUserStorage";
import { userStorageDb } from "@/db/storage/user.storage";

interface IHarvestController {
   createAttempt: (req: Request<{}, {}, IHarvestAttemptCreateRequest>, res: Response<IHarvestAttemptResponse>) => Promise<void>;
   getUserAttemptsView: (req: Request, res: Response<IHarvestAttemptListResponse>) => Promise<void>;
   getSingleAttempt: (req: Request<{ id: string }>, res: Response<IHarvestAttemptResponse>) => Promise<void>;
   getCurrentUserAverageAttempts: (req: Request, res: Response<IHarvestUserAndGlobalAverageAttemptsResponse>) => Promise<void>;
   getOtherUserAverageAttempts: (req: Request, res: Response<IHarvestUserAverageAttemptsResponse>) => Promise<void>;
   updateAttempt: (req: Request<{}, {}, IHarvestAttemptUpdateRequest>, res: Response<IHarvestAttemptResponse>) => Promise<void>;
   deleteAttempt: (req: Request<{ id: string }>, res: Response<IDeleteResponse>) => Promise<void>;
}

class HarvestController implements IHarvestController {
   private harvestStorage: IHarvestStorage;
   private userStorage: IUserStorage;

   constructor(harvestStorage: IHarvestStorage, userStorage: IUserStorage) {
      this.harvestStorage = harvestStorage;
      this.userStorage = userStorage;

      this.createAttempt = this.createAttempt.bind(this);
      this.getUserAttemptsView = this.getUserAttemptsView.bind(this);
      this.getSingleAttempt = this.getSingleAttempt.bind(this);
      this.getCurrentUserAverageAttempts = this.getCurrentUserAverageAttempts.bind(this);
      this.getOtherUserAverageAttempts = this.getOtherUserAverageAttempts.bind(this);
      this.updateAttempt = this.updateAttempt.bind(this);
      this.deleteAttempt = this.deleteAttempt.bind(this);
   }

   async createAttempt(req: Request<{}, {}, IHarvestAttemptCreateRequest>, res: Response<IHarvestAttemptResponse>): Promise<void> {
      if (!req.user) throw createHttpError(500, "user id lost: harvest create");

      try {
         const attemptToAdd: IHarvestAttemptCreate = {
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
         throw error;
      }
   }

   async getUserAttemptsView(req: Request, res: Response<IHarvestAttemptListResponse>): Promise<void> {
      if (!req.user) throw createHttpError(500, "user id lost: harvest get");
      const { id: userId } = req.user;
      const { count, page } = req.query;
      const info: IGetAttemptsInfo = {
         count: typeof count === "string" ? +count : 20,
         page: typeof page === "string" ? +page : 20,
      };
      const data = await this.harvestStorage.getUserAttemptsView(userId, info);
      res.json({ attemptsInfo: data });
   }

   async getSingleAttempt(req: Request, res: Response<IHarvestAttemptResponse>): Promise<void> {
      if (!req.user) throw createHttpError(500, "user id lost: harvest get");

      const { id } = req.params;
      const attempt = await this.harvestStorage.getSingleAttempt(+id);
      if (!attempt) throw createHttpError(404, "ATTEMPT_NOT_FOUND");
      res.json({ attempt });
   }

   async getCurrentUserAverageAttempts(req: Request, res: Response<IHarvestUserAndGlobalAverageAttemptsResponse>): Promise<void> {
      if (!req.user) throw createHttpError(500, "user id lost: harvest delete");

      const { id: userId } = req.user;

      const [globalAttemptsWithTotal, userAttemptsWithTotal] = await Promise.all([
         this.harvestStorage.getAllAttempts(),
         this.harvestStorage.getUserAttempts(userId),
      ]);

      const data: IHarvestUserAndGlobalAverageAttempts = {
         currentUser: {
            averageAttempt: findAverageValues(userAttemptsWithTotal.items),
            total: userAttemptsWithTotal.total,
         },
         global: {
            averageAttempt: findAverageValues(globalAttemptsWithTotal.items),
            total: globalAttemptsWithTotal.total,
         },
      };

      res.json({ defaultAverage: data });
   }

   async getOtherUserAverageAttempts(req: Request, res: Response<IHarvestUserAverageAttemptsResponse>): Promise<void> {
      if (!req.user) throw createHttpError(500, "user id lost: harvest delete");

      const { nickname } = req.params;
      const userFromDatabase = await this.userStorage.getOneUserByNickname(nickname);
      if (!userFromDatabase.id) throw createHttpError(400, "USER_NOT_FOUND");

      const userAttempts = await this.harvestStorage.getUserAttempts(userFromDatabase.id);

      const averageAttempt: IHarvestAverageAttemptsObj = {
         averageAttempt: findAverageValues(userAttempts.items),
         total: userAttempts.total,
      };

      res.json({ user: averageAttempt });
   }

   async updateAttempt(req: Request<{}, {}, IHarvestAttemptUpdateRequest>, res: Response<IHarvestAttemptResponse>): Promise<void> {
      if (!req.user) throw createHttpError(500, "user id lost: harvest update");

      const attemptToUpdate: IHarvestAttemptUpdate = {
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

const harvestController = new HarvestController(harvestStorageDb, userStorageDb);
export default harvestController;
