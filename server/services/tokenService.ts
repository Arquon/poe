import { IUserData } from "@@@/types/user/IUserData";
import jwt from "jsonwebtoken";
import { jwt_secret_key as jwtSecretKey } from "@/config/config.json";

const isProd = process.env.NODE_ENV === "production";

interface ITokenService {}

export class TokenService implements ITokenService {
   static generateAccessToken(payload: IUserData) {
      return jwt.sign(payload, jwtSecretKey);
   }

   static validateAccessToken(token: string) {
      try {
         const userData = jwt.verify(token, jwtSecretKey);
         return userData;
      } catch (e) {
         return null;
      }
   }
}
