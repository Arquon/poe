import httpService from "./http.service";

import { type IAuthData } from "@@@/types/auth/IAuthData";
import { type IUserResponse } from "@@@/types/api/user/IUserResponse";

const usersEndPoint = "user";

export const authService = {
   signUp: async (registrationData: IAuthData) => {
      const { data } = await httpService.post<IUserResponse>(`${usersEndPoint}/registration`, {
         ...registrationData,
      });
      return data.user;
   },
   signIn: async (loginData: IAuthData) => {
      console.log("signIn");
      const { data } = await httpService.post<IUserResponse>(`${usersEndPoint}/login`, {
         ...loginData,
      });
      return data.user;
   },
   getCurrentUserData: async () => {
      const { data } = await httpService.get<IUserResponse>(usersEndPoint);
      return data.user;
   },
   logout: async () => {
      await httpService.post<IUserResponse>(`${usersEndPoint}/logout`);
   },
};
