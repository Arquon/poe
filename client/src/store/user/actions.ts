import { authService } from "@/services/auth.service";
// import { localStorageService } from "@/services/localStorage.service";

import { type Nullable } from "@/types/default";
import { type ValidationErrors } from "@/types/validator/errorTypes";
import {
   signInNetworkErrorsHandler,
   signUpNetworkErrorsHandler,
   defaultNetworkErrorsHandler as userNetworkErrorsHandler,
} from "@/utils/networkErrorHandlers";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { type IAuthData } from "@@@/types/auth/IAuthData";
import { type IUserData } from "@@@/types/user/IUserData";

const login = createAsyncThunk<IUserData, IAuthData, { rejectValue: string | ValidationErrors<IAuthData> }>(
   "user/login",
   async function (authData, { rejectWithValue }) {
      try {
         const userData = await authService.signIn(authData);
         return userData;
      } catch (error) {
         console.log({ error });
         const parsedError = signInNetworkErrorsHandler(error);
         console.log({ parsedError });
         return rejectWithValue(parsedError);
      }
   }
);

const register = createAsyncThunk<IUserData, IAuthData, { rejectValue: string | ValidationErrors<IAuthData> }>(
   "user/register",
   async function (registrationData, { rejectWithValue }) {
      try {
         const userData = await authService.signUp(registrationData);
         return userData;
      } catch (error) {
         const parsedError = signUpNetworkErrorsHandler(error);
         return rejectWithValue(parsedError);
      }
   }
);

const getCurrentUserData = createAsyncThunk<Nullable<IUserData>, { signal?: AbortSignal }, { rejectValue: string }>(
   "user/getCurrentUserData",
   async function ({ signal }, { rejectWithValue }) {
      try {
         const data = await authService.getCurrentUserData(signal);
         return data;
      } catch (error) {
         const parsedError = userNetworkErrorsHandler(error);
         return rejectWithValue(parsedError);
      }
   }
);

const logout = createAsyncThunk<undefined, undefined, { rejectValue: string }>(
   "user/logout",
   async function (_, { rejectWithValue }) {
      try {
         await authService.logout();
      } catch (error) {
         const parsedError = userNetworkErrorsHandler(error);
         return rejectWithValue(parsedError);
      }
   }
);

const userActions = {
   login,
   register,
   getCurrentUserData,
   logout,
};

export { login, register, getCurrentUserData, logout };
export default userActions;
