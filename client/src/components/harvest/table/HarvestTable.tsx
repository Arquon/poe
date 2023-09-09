import { useAppSelector } from "@/store/store";
import React, { type FC } from "react";
import { HarvestAttemptItem } from "./HarvestAttemptItem";
import { HarvestPagination } from "./HarvestPagination";
import { ATTEMPTS_IN_PAGES } from "@/services/harvest.service";

interface HarvestTableProps {}

export const HarvestTable: FC<HarvestTableProps> = () => {
   const { attempts, total } = useAppSelector((state) => state.harvest);
   return (
      <div className="harvest-table-wrap mb-3">
         <div className="harvest-table">
            <HarvestTableHeader />

            {attempts.length !== 0 && (
               <div className="harvest-table-body mb-3">
                  {attempts.map((attempt) => (
                     <HarvestAttemptItem key={attempt.id} attempt={attempt} />
                  ))}
               </div>
            )}

            <HarvestPagination total={total} attemptsInPage={ATTEMPTS_IN_PAGES} />
         </div>
      </div>
   );
};

const HarvestTableHeader: FC = () => (
   <div className="harvest-table-head row justify-content-center align-items-center mb-3">
      <div className="col-3 text-center">Желтая жизненная сила</div>
      <div className="col-3 text-center">Синяя жизненная сила</div>
      <div className="col-3 text-center">Красная жизненная сила</div>
      <div className="col-3 text-center">Профит</div>
   </div>
);
