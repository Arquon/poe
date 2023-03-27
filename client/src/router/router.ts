import { HarvestAttemptPage } from "@/pages/HarvestAttemptPage";
import { HarvestPage } from "@/pages/HarvestPage";
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
}

interface IBasicIndexedRoute extends IRoute {
   index: true;
   path?: never;
}

interface IBasicNonIndexedRoute extends IRoute {
   index?: never;
   path: string;
}

interface IBasicNonIndexedRoute extends IRoute {
   index?: never;
   path: string;
}

export type TBasicRoute = (IBasicIndexedRoute | IBasicNonIndexedRoute) & {
   children?: TBasicRoute[];
};

const landingRoutes: TBasicRoute[] = [
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

const basicRoutes: TBasicRoute[] = [
   {
      name: "harvest",
      path: ERoutes.harvest,
      Element: HarvestPage,
      children: [
         {
            name: "harvestAttempt",
            Element: HarvestAttemptPage,
            path: ERoutes.harvestAttempt,
         },
      ],
   },
];

export { landingRoutes, basicRoutes };
