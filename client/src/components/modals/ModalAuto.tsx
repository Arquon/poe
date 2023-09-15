import React, { type PropsWithChildren, type FC } from "react";

interface AutoModalProps extends PropsWithChildren {}

export const ModalAuto: FC<AutoModalProps> = ({ children }) => {
   return (
      <div className="modal-auto">
         <div className="bg-white rounded shadow">
            <div className="modal-wrap">
               <div className="p-4">{children}</div>
            </div>
         </div>
      </div>
   );
};
