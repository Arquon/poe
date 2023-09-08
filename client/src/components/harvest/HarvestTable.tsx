import { useAppSelector } from "@/store/store";
import React, { type FC } from "react";
import { HarvestRunAttemptItem } from "./HarvestRunAttemptItem";

interface HarvestTableProps {}

export const HarvestTable: FC<HarvestTableProps> = () => {
   const { attempts } = useAppSelector((state) => state.harvest);

   return (
      <>
         <HarvestTableHeader />

         {attempts.map((attempt) => (
            <HarvestRunAttemptItem key={attempt.id} attempt={attempt} />
         ))}
      </>
   );
};

const HarvestTableHeader: FC = () => (
   <div className="row justify-content-center align-items-center g-2 mb-5">
      <div className="col">Желтая жизненная сила</div>
      <div className="col">Синяя жизненная сила</div>
      <div className="col">Красная жизненная сила</div>
      <div className="col">Профит</div>
   </div>
);
