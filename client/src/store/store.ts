import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/slice";
import logger from "redux-logger";
import { type TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import harvestReducer from "./harvest/slice";

const store = configureStore({
   reducer: {
      user: userReducer,
      harvest: harvestReducer,
   },
   devTools: process.env.NODE_ENV !== "production",
   middleware: (getDefaultMiddleware) => {
      const middleware = getDefaultMiddleware();
      if (process.env.NODE_ENV !== "production") middleware.push(logger);
      return middleware;
   },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppGetState = typeof store.getState;
export type AppActionType<T = void> = (dispatch: AppDispatch, getState: AppGetState) => T;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
