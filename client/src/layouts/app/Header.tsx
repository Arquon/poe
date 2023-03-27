import { Container } from "@/components/ui/Container";
import { ERoutes } from "@/router/router";
import { useAppDispatch, useAppSelector } from "@/store/store";
import userActions from "@/store/user/actions";
import React, { type FC } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

interface HeaderProps {}

export const Header: FC<HeaderProps> = () => {
   const { user } = useAppSelector((state) => state.user);
   const dispatch = useAppDispatch();
   const navigate = useNavigate();

   const signOut = (): void => {
      dispatch(userActions.signOut());
      navigate("/");
   };

   if (!user) return <Navigate to={"/login"} />;

   return (
      <header>
         <Container>
            <div className="row py-5">
               <div className="col-4">
                  <Link className="fs-5" to={ERoutes.landing}>
                     Главная
                  </Link>
               </div>
               <div className="col-4 text-center">
                  <Link className="fs-5" to={ERoutes.harvest}>
                     Жатва
                  </Link>
               </div>

               <div className="col-4 text-end">
                  <a className="fs-5" onClick={signOut}>
                     {user.email}
                  </a>
               </div>
            </div>
         </Container>
      </header>
   );
};
