import { type TBasicRoute, routes } from "@/router/router";
import { useAppDispatch, useAppSelector } from "@/store/store";
import userActions from "@/store/user/actions";
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

interface Props {}

function RenderRoutes(children: TBasicRoute[]): JSX.Element[] {
   return children.map(({ name, Element, index, path, children: nestedChildren }) => {
      if (nestedChildren) {
         return (
            <Route key={name} path={path} element={<Element />}>
               {RenderRoutes(nestedChildren)}
            </Route>
         );
      }
      return <Route key={name} path={path} element={<Element />} index={index} />;
   });
}

export const App: React.FC<Props> = () => {
   const { isLoadingUser } = useAppSelector((state) => state.user);
   const dispatch = useAppDispatch();

   const fetchUserData = async (): Promise<void> => {
      await dispatch(userActions.getCurrentUserData());
   };

   useEffect(() => {
      fetchUserData();
   }, []);

   return (
      <div className="wrapper">
         {!isLoadingUser && <Routes>{RenderRoutes(routes)}</Routes>}
         <ToastContainer />
      </div>
   );
};
