import { IUserData } from "@@@/types/user/IUserData";
import jwt from "jsonwebtoken";
import config from "@/config/config.json";

const isProd = process.env.NODE_ENV === "production";

const { dev, prod } = config;
const jwtSecretKey = isProd ? prod.jwt_secret_key : dev.jwt_secret_key;

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
