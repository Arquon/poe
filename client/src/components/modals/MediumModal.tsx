import React, { type PropsWithChildren, type FC } from "react";

interface MediumModalProps extends PropsWithChildren {
   hidden?: boolean;
}

export const ModalMedium: FC<MediumModalProps> = ({ children, hidden = false }) => {
   return (
      <div className="modal-medium">
         <div className="bg-white rounded shadow">
            <div className="modal-wrap">
               <div className="p-4">{children}</div>
            </div>
         </div>
      </div>
   );
};
