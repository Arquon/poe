import { MainLayout } from "@/layouts/MainLayout";
import { HarvestAttemptPage } from "@/pages/HarvestAttemptPage";
import { HarvestPageAuth } from "@/pages/HarvestPage";
import { Landing } from "@/pages/Landing";
import { LoginPage } from "@/pages/LoginPage";
import { type FC } from "react";

export enum ERoutes {
   landing = "/",
   harvest = "/harvest",
   harvestAttempt = "/harvest/:harvestAttemptId",
   login = "/login",
}

interface IRoute {
   name: string;
   Element: FC;
   children?: TBasicRoute[];
}

interface IBasicIndexedRoute extends IRoute {
   index: true;
   path?: never;
}

interface IBasicNonIndexedRoute extends IRoute {
   index?: never;
   path?: ERoutes;
}

interface IBasicRouteWithChildrenOnly extends IRoute {
   children: TBasicRoute[];
   path?: never;
   index?: never;
}

export type TBasicRoute = IBasicIndexedRoute | IBasicNonIndexedRoute | IBasicRouteWithChildrenOnly;

const routes: TBasicRoute[] = [
   {
      name: "mainLayout",
      Element: MainLayout,
      children: [
         {
            name: "harvest",
            path: ERoutes.harvest,
            Element: HarvestPageAuth,
            children: [
               {
                  name: "harvestAttempt",
                  Element: HarvestAttemptPage,
                  path: ERoutes.harvestAttempt,
               },
            ],
         },
      ],
   },
   {
      name: "landing",
      path: ERoutes.landing,
      Element: Landing,
      children: [
         {
            name: "login",
            path: ERoutes.login,
            Element: LoginPage,
         },
      ],
   },
];

export { routes };
