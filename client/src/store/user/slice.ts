import { type IUserData } from "@@@/types/user/IUserData";
import { type Nullable } from "@/types/default";
import { createSlice } from "@reduxjs/toolkit";
import { getCurrentUserData, login, logout, register } from "./actions";
import { isUserAsyncThunkError } from "@/utils/asyncThunkErrorChecking";

interface IUserState {
   user: Nullable<IUserData>;
   isLoadingUser: boolean;
}

const initialState: IUserState = {
   user: null,
   isLoadingUser: true,
};

const userSlice = createSlice({
   name: "user",
   initialState,
   reducers: {},
   extraReducers(builder) {
      builder
         .addCase(login.fulfilled, (state, action) => {
            state.user = action.payload;
         })
         .addCase(register.fulfilled, (state, action) => {
            state.user = action.payload;
         })
         .addCase(logout.fulfilled, (state) => {
            state.user = null;
         })
         .addCase(getCurrentUserData.pending, (state) => {
            state.isLoadingUser = true;
         })
         .addCase(getCurrentUserData.fulfilled, (state, action) => {
            state.isLoadingUser = false;
            state.user = action.payload;
         })
         .addMatcher(isUserAsyncThunkError, (state) => {
            state.isLoadingUser = false;
         });
   },
});

const { actions, reducer: userReducer } = userSlice;
export { actions };
export default userReducer;
