import { MainLayout } from "@/layouts/MainLayout";
import { type TBasicRoute, basicRoutes, landingRoutes } from "@/router/router";
import React from "react";
import { Route, Routes } from "react-router-dom";

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
   return (
      <div className="wrapper">
         <Routes>
            {RenderRoutes(landingRoutes)}

            <Route element={<MainLayout />}>{RenderRoutes(basicRoutes)}</Route>
         </Routes>
      </div>
   );
};
