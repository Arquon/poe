import { type IAuthData } from "@@@/types/auth/IAuthData";
import { type IAuthResponse } from "@@@/types/auth/IAuthResponse";
import { type IRegistrationData } from "@@@/types/auth/IRegistrationData";
import { type IUserCredentials } from "@@@/types/auth/IUserCredentials";
import axios from "axios";
import httpService from "./http.service";
import { type IUserData } from "@@@/types/user/IUserData";

const authHttpService = axios.create();

const usersEndPoint = "users/";

export const authService = {
   signUp: async (registrationData: IRegistrationData) => {
      const { data } = await authHttpService.post<IUserCredentials>("accounts:signUp", {
         ...registrationData,
      });
      return data;
   },
   signIn: async (loginData: IAuthData) => {
      const { data } = await authHttpService.post<IAuthResponse>("accounts:signInWithPassword", {
         ...loginData,
      });
      return data;
   },
   // refreshToken: async (refreshToken: string): Promise<IUserCredentials> => {
   //    const { data } = await authHttpService.post<IRefreshResponse>("token", {
   //       grant_type: "refresh_token",
   //       refresh_token: refreshToken,
   //    });
   //    return {
   //       expiresIn: Number(data.expires_in),
   //       idToken: data.id_token,
   //       localId: data.user_id,
   //       refreshToken: data.refresh_token,
   //    };
   // },
   createUser: async (userData: IUserData, id: string) => {
      const { data } = await httpService.put<IUserData>(usersEndPoint + id + "/", { ...userData, id });
      return data;
   },
   getUserData: async (userId: string) => {
      const { data } = await httpService.get<IUserData>(usersEndPoint + userId + "/");
      return data;
   },
};
