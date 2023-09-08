import { Container } from "@/components/ui/Container";
import { ERoutes } from "@/router/router";
import { useAppDispatch, useAppSelector } from "@/store/store";
import userActions from "@/store/user/actions";
import { unwrapResult } from "@reduxjs/toolkit";
import React, { type FC } from "react";
import { Link, useNavigate } from "react-router-dom";

interface HeaderProps {}

export const Header: FC<HeaderProps> = () => {
   const { user } = useAppSelector((state) => state.user);
   const dispatch = useAppDispatch();
   const navigate = useNavigate();

   const logout = async (): Promise<void> => {
      unwrapResult(await dispatch(userActions.logout()));
      navigate("/");
   };

   return (
      <header>
         <Container>
            <div className="row py-5">
               <div className="col-4">
                  <Link to={ERoutes.landing}>Главная</Link>
               </div>
               <div className="col-4 text-center">
                  <Link to={ERoutes.harvest}>Жатва</Link>
               </div>

               <div className="col-4 text-end">
                  <span className="me-3 ">Logged as {user?.nickname}</span>
                  <a role="button" onClick={logout}>
                     Выйти
                  </a>
               </div>
            </div>
         </Container>
      </header>
   );
};
