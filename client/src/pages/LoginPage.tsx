import React, { type FC } from "react";

interface LoginPageProps {}

export const LoginPage: FC<LoginPageProps> = ({}) => {
   return (
      <div
         onClick={(event) => {
            event.preventDefault();
         }}
      >
         LoginPage
      </div>
   );
};
