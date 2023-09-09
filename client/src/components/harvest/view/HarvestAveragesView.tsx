import { useAppSelector } from "@/store/store";
import React, { useState, type FC, type PropsWithChildren } from "react";
import { HarvestView } from "./HarvestView";
import { type Nullable } from "@/types/default";
import { type IHarvestAverageAttempt } from "@@@/types/harvest/IHarvestSingleAttemptView";
import { getClassNameFromArray } from "@/utils/functions/functions";

interface HarvestAveragesViewProps {}

enum EAverageAttemptTab {
   user = "user",
   global = "global",
   none = "none",
}

export const HarvestAveragesView: FC<HarvestAveragesViewProps> = ({}) => {
   const { averageAttempts } = useAppSelector((state) => state.harvest);
   const [averageTab, setAverageTab] = useState(() => {
      if (averageAttempts?.user) return EAverageAttemptTab.user;
      if (averageAttempts?.global) return EAverageAttemptTab.global;
      return EAverageAttemptTab.none;
   });

   const getCurrentAverage = (): Nullable<IHarvestAverageAttempt> | undefined => {
      if (averageTab === EAverageAttemptTab.user) return averageAttempts?.user;
      if (averageTab === EAverageAttemptTab.global) return averageAttempts?.global;
      return null;
   };

   const currentAverage = getCurrentAverage();

   return (
      <div>
         <h3 className="mb-3">Средние значения за воспоминание</h3>
         <ul className="nav  nav-pills d-flex justify-content-center mb-3">
            {averageAttempts?.user && (
               <HarvestAverageTab
                  onClick={() => {
                     setAverageTab(EAverageAttemptTab.user);
                  }}
                  active={averageTab === EAverageAttemptTab.user}
               >
                  Мои
               </HarvestAverageTab>
            )}
            {averageAttempts?.global && (
               <HarvestAverageTab
                  onClick={() => {
                     setAverageTab(EAverageAttemptTab.global);
                  }}
                  active={averageTab === EAverageAttemptTab.global}
               >
                  Общие
               </HarvestAverageTab>
            )}
         </ul>
         {currentAverage ? <HarvestView attempt={{ ...currentAverage, note: "" }} /> : <p>Нет средних значений</p>}
      </div>
   );
};

interface HarvestAverageTabProps extends PropsWithChildren {
   active?: boolean;
   onClick: () => void;
}

const HarvestAverageTab: FC<HarvestAverageTabProps> = ({ active, children, onClick }) => {
   const computedClassName = ["nav-link"];

   if (active) computedClassName.push("active");

   return (
      <li className="nav-item">
         <a className={getClassNameFromArray(computedClassName)} onClick={onClick}>
            {children}
         </a>
      </li>
   );
};
