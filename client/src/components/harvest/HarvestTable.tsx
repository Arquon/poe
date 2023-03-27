import { useAppSelector } from "@/store/store";
import React, { type FC } from "react";
import { HarvestRunAttemptItem } from "./HarvestRunAttemptItem";

interface HarvestTableProps {}

export const HarvestTable: FC<HarvestTableProps> = () => {
   const { runs, prices } = useAppSelector((state) => state.harvest);

   return (
      <div className="container">
         <HarvestTableHeader />

         {runs.map((attempt) => (
            <HarvestRunAttemptItem key={attempt.id} attempt={attempt} prices={prices} />
         ))}
      </div>
   );
};

const HarvestTableHeader: FC = () => (
   <div className="row justify-content-center align-items-center g-2">
      <div className="col">Желтая жизненная сила</div>
      <div className="col">Синяя жизненная сила</div>
      <div className="col">Красная жизненная сила</div>
      <div className="col">Профит</div>
   </div>
);
