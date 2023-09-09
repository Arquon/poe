import { NumericView } from "@/components/ui/view/NumericView";
import { type IHarvestPrices } from "@@@/types/harvest/IHarvestPrices";
import React, { type FC } from "react";

interface HarvestPricesViewBlockProps {
   prices: IHarvestPrices;
   invitations: number;
   profit?: string;
}

export const HarvestPricesViewBlock: FC<HarvestPricesViewBlockProps> = ({
   prices,
   invitations: invitationsCount,
   profit,
}) => {
   const { yellow, blue, red, memory, invitation: invitationPrice } = prices;

   return (
      <>
         <div className="mb-3">
            <div className="row justify-content-between">
               <div className="col-auto">
                  <p>Количество жижи за диван</p>
               </div>
               {profit && (
                  <div className="col-auto">
                     <p>Профит {profit}</p>
                  </div>
               )}
            </div>

            <div className="row">
               <div className="col-4">
                  <NumericView value={yellow} label="Желтой" />
               </div>
               <div className="col-4">
                  <NumericView value={blue} label="Синей" />
               </div>
               <div className="col-4">
                  <NumericView value={red} label="Красной" />
               </div>
            </div>
         </div>
         <div className="row mb-3">
            <div className="col-4">
               <NumericView value={memory} label="Стоимость воспоминания" />
            </div>
            <div className="col-4">
               <NumericView value={invitationsCount} label="Количество приглашений" />
            </div>
            {!!invitationsCount && (
               <div className="col-4">
                  <NumericView value={invitationPrice} label="Стоимость приглашения" />
               </div>
            )}
         </div>
      </>
   );
};
