import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import { DatabaseError } from "pg";

import { IAuthData, IAuthDataWithId } from "@@@/types/auth/IAuthData";

import { IUserResponse } from "@@@/types/api/user/IUserResponse";
import { IDeleteResponse } from "@@@/types/api/IDeleteResponse";

import { IUserStorage } from "@/types/storage/IUserStorage";
import { userStorageDb } from "@/db/storage/user.storage";

import { EDatabaseErrorCodes } from "@/types/errors/EDatabaseErrorCodes";
import { TokenService } from "@/services/tokenService";
import { UserDto } from "@/dto/user.dto";
import { Request, Response } from "express";

interface IUserController {
   registration: (req: Request<{}, IAuthData>, res: Response<IUserResponse>) => Promise<void>;
   login: (req: Request<{}, IAuthData>, res: Response<IUserResponse>) => Promise<void>;
   logout: (req: Request, res: Response) => Promise<void>;
   getCurrentUser: (req: Request, res: Response<IUserResponse>) => Promise<void>;
   updateUser: (req: Request<{}, {}, IAuthData>, res: Response<IUserResponse>) => Promise<void>;
   deleteUser: (req: Request<{ id: string }>, res: Response<IDeleteResponse>) => Promise<void>;
}

class UserController implements IUserController {
   private userStorage: IUserStorage;

   constructor(userStorage: IUserStorage) {
      this.userStorage = userStorage;

      this.registration = this.registration.bind(this);
      this.login = this.login.bind(this);
      this.getCurrentUser = this.getCurrentUser.bind(this);
      this.updateUser = this.updateUser.bind(this);
      this.deleteUser = this.deleteUser.bind(this);
   }

   async registration(req: Request<{}, IAuthData>, res: Response<IUserResponse>) {
      // if (!!true) throw createHttpError(400, "USER_EXISTS");
      const { nickname, password } = req.body;
      try {
         const hashedPassword = await bcrypt.hash(password, 10);
         const newUser = await this.userStorage.createUser({ nickname, password: hashedPassword });
         const userDto = new UserDto(newUser);
         const accessToken = TokenService.generateAccessToken({ ...userDto });
         res.cookie("accessToken", accessToken, { maxAge: 1000 * 60 * 60 * 24 * 30 });
         res.json({ user: userDto });
      } catch (error) {
         if (error instanceof DatabaseError) {
            switch (error.code) {
               case EDatabaseErrorCodes.unique_violation:
                  throw createHttpError(400, "USER_EXISTS");
            }
         }
         throw error;
      }
   }

   async login(req: Request<{}, IAuthData>, res: Response<IUserResponse>) {
      const { nickname, password } = req.body;
      const userFromDatabase = await this.userStorage.getOneUserByNickname(nickname);

      if (!userFromDatabase.id) throw createHttpError(400, "USER_NOT_FOUND");

      const isPasswordValid = bcrypt.compareSync(password, userFromDatabase.password);
      if (!isPasswordValid) throw createHttpError(400, "INVALID_PASSWORD");

      const userDto = new UserDto(userFromDatabase);
      const accessToken = TokenService.generateAccessToken({ ...userDto });
      res.cookie("accessToken", accessToken, { maxAge: 1000 * 60 * 60 * 24 * 30 });
      res.json({ user: userDto });
   }

   async logout(req: Request, res: Response) {
      res.clearCookie("accessToken");
      res.json({ message: "ok" });
   }

   async getCurrentUser(req: Request, res: Response<IUserResponse>) {
      if (!req.user) throw createHttpError(500, "user id lost: users get current ");

      res.json({ user: req.user });
   }

   async updateUser(req: Request<{}, {}, IAuthData>, res: Response<IUserResponse>) {
      if (!req.user) throw createHttpError(500, "user id lost: users update");

      const user: IAuthDataWithId = { ...req.body, id: req.user.id };
      const updatedUser = await this.userStorage.updateUser(user);
      if (!updatedUser) throw createHttpError(404, "USER_NOT_FOUND");
      const userDto = new UserDto(updatedUser);

      res.json({ user: userDto });
   }

   async deleteUser(req: Request, res: Response<IDeleteResponse>) {
      if (!req.user) throw createHttpError(500, "user id lost: users update");

      const { id } = req.user;
      const deletedId = await this.userStorage.deleteUser(+id);
      if (!deletedId) throw createHttpError(404, "USER_NOT_FOUND");
      res.clearCookie("accessToken");
      res.json({ id: deletedId });
   }
}

const userController = new UserController(userStorageDb);

export default userController;
