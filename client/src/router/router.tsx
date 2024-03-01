import React from "react";
import { type RouteObject } from "react-router-dom";

import { MainLayout } from "@/layouts/MainLayout";
import { HarvestAttemptPage } from "@/pages/HarvestAttemptPage";
import { HarvestPageAuth } from "@/pages/HarvestPage";
import { Landing } from "@/pages/Landing";
import { LoginPage } from "@/pages/LoginPage";

export enum ERoutes {
   landing = "/",
   harvest = "/harvest",
   harvestAttempt = "/harvest/:id",
   login = "/login",
}

const routes: RouteObject[] = [
   {
      element: <MainLayout />,
      children: [
         {
            path: ERoutes.harvest,
            element: <HarvestPageAuth />,
            children: [
               {
                  element: <HarvestAttemptPage />,
                  path: ERoutes.harvestAttempt,
               },
            ],
         },
      ],
   },
   {
      path: ERoutes.landing,
      element: <Landing />,
      children: [
         {
            path: ERoutes.login,
            element: <LoginPage />,
         },
      ],
   },
];

export { routes };
