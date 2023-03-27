import { Container } from "@/components/ui/Container";
import { ModalProvider } from "@/providers/ModalProvider";
import { ERoutes } from "@/router/router";
import { useAppSelector, useAppDispatch } from "@/store/store";
import userActions from "@/store/user/actions";
import React, { type FC } from "react";
import { useLocation, useNavigate, Link, Outlet } from "react-router-dom";

interface LandingProps {}

export const Landing: FC<LandingProps> = ({}) => {
   const location = useLocation();
   const { user } = useAppSelector((state) => state.user);
   const dispatch = useAppDispatch();
   const navigate = useNavigate();

   const isAuth = !!user;

   const signOut = (): void => {
      dispatch(userActions.signOut());
      navigate("/");
   };

   return (
      <>
         <Container>
            Landing
            <div className="col-4 text-end">
               {isAuth ? (
                  <a className="fs-5" onClick={signOut}>
                     {user.email}
                  </a>
               ) : (
                  <Link className="fs-5" to={ERoutes.login} state={{ background: location }}>
                     Войти
                  </Link>
               )}
            </div>
         </Container>

         <ModalProvider>
            <Outlet />
         </ModalProvider>
      </>
   );
};
