import { UserDto } from "@/dto/user.dto";
import { TokenService } from "@/services/tokenService";
import { IUserData } from "@@@/types/user/IUserData";
import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";

export function authMiddleWare(req: Request, res: Response, next: NextFunction) {
   if (!req.cookies) throw createHttpError(401, "UNAUTHORIZED");

   const { accessToken } = req.cookies;
   if (!accessToken) throw createHttpError(401, "UNAUTHORIZED");

   const userData = TokenService.validateAccessToken(accessToken) as IUserData | null;
   if (!userData) throw createHttpError(401, "INVALID_TOKEN");

   req.user = { ...new UserDto(userData) };
   next();
}
