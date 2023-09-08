import { LoginForm } from "@/components/login/LoginForm";
import { RegistrationForm } from "@/components/login/RegistrationForm";
import { WithoutAuth } from "@/hoc/WithoutAuth";
import { ModalProvider } from "@/providers/ModalProvider";
import React, { useState, type FC } from "react";
import { useNavigate } from "react-router-dom";

export enum ELoginPage {
   login = "login",
   register = "register",
}

interface LoginPageProps {}

export const LoginPageComponent: FC<LoginPageProps> = ({}) => {
   const [loginPage, setLoginPage] = useState(ELoginPage.login);
   // const {close} = useModal();

   let Component: JSX.Element;

   switch (loginPage) {
      case ELoginPage.login:
         Component = <LoginForm />;
         break;
      case ELoginPage.register:
         Component = <RegistrationForm />;
         break;
   }

   const togglePage = (): void => {
      setLoginPage((prevPage) => (prevPage === ELoginPage.login ? ELoginPage.register : ELoginPage.login));
   };

   return (
      <div className="bg-white rounded  shadow p-4">
         <h2>{loginPage === ELoginPage.login ? "Авторизация" : "Регистрация"}</h2>
         {Component}
         <div className="mt-3">
            <a role="button" onClick={togglePage}>
               {loginPage === ELoginPage.login ? "Регистрация" : "Авторизация"}
            </a>
         </div>
      </div>
   );
};

export const LoginPage: FC<LoginPageProps> = (props) => {
   const navigate = useNavigate();

   const closeModal = (): void => {
      navigate("/");
   };

   return (
      <WithoutAuth>
         <ModalProvider close={closeModal}>
            <div className="modal-login">
               <LoginPageComponent {...props} />
            </div>
         </ModalProvider>
      </WithoutAuth>
   );
};
