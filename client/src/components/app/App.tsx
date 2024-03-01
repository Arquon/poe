import { useFetchAbortEffect } from "@/hooks/useFetchAbortEffect";
import { routes } from "@/router/router";
import { useAppDispatch, useAppSelector } from "@/store/store";
import userActions from "@/store/user/actions";
import React from "react";
import { useRoutes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

interface Props {}

export const App: React.FC<Props> = () => {
   const { isLoadingUser } = useAppSelector((state) => state.user);
   const dispatch = useAppDispatch();

   const fetchUserData = async (signal?: AbortSignal): Promise<void> => {
      await dispatch(userActions.getCurrentUserData({ signal }));
   };

   useFetchAbortEffect((signal) => {
      fetchUserData(signal);
   }, []);

   const appRoutes = useRoutes(routes);

   return (
      <div className="wrapper">
         {!isLoadingUser && appRoutes}
         <ToastContainer />
      </div>
   );
};
