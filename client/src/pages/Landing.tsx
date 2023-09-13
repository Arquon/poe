import { ERoutes } from "@/router/router";
import { useAppSelector } from "@/store/store";
import React, { type FC } from "react";
import { useLocation, Link, Outlet } from "react-router-dom";

interface LandingProps {}

export const Landing: FC<LandingProps> = ({}) => {
   const location = useLocation();
   const { user } = useAppSelector((state) => state.user);

   const isAuth = !!user;

   return (
      <section className="landing">
         <div>
            {isAuth ? (
               <Link className="fs-1" to={ERoutes.harvest}>
                  Перейти к статистике
               </Link>
            ) : (
               <Link className="fs-1" to={ERoutes.login} state={{ background: location }}>
                  Войти
               </Link>
            )}
         </div>
         <Outlet />
      </section>
   );
};
