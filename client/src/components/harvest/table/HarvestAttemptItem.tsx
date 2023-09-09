import React, { type MouseEvent, type FC } from "react";
import { type IHarvestAttemptView } from "@@@/types/harvest/IHarvestAttempt";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { getProfitString } from "@/utils/functions/harvest";
import { useAppDispatch } from "@/store/store";
import { unwrapResult } from "@reduxjs/toolkit";
import harvestAsyncActions from "@/store/harvest/actions";
import { toastError, toastSuccess } from "@/utils/functions/functions";
import { DeleteButton } from "@/components/ui/Button";

interface HarvestRunAttemptItemProps {
   attempt: IHarvestAttemptView;
}

export const HarvestAttemptItem: FC<HarvestRunAttemptItemProps> = ({ attempt }) => {
   const { total, id } = attempt;
   const [searchParams] = useSearchParams();
   const navigate = useNavigate();
   const page = Number(searchParams.get("page")) || 1;

   const dispatch = useAppDispatch();

   const deleteAttempt = async (event: MouseEvent<HTMLButtonElement>): Promise<void> => {
      event.preventDefault();
      try {
         unwrapResult(await dispatch(harvestAsyncActions.deleteAttempt(id)));
         const [getAttemptsResult, getAverageAttemptsResult] = await Promise.all([
            dispatch(harvestAsyncActions.getAttempts(page)),
            dispatch(harvestAsyncActions.getAverageAttempts()),
         ]);
         unwrapResult(getAttemptsResult);
         unwrapResult(getAverageAttemptsResult);
         toastSuccess("Попытка удалена");
      } catch (e) {
         toastError(e);
      }
   };

   const navigateToAttemptView = (event: MouseEvent<HTMLAnchorElement>): void => {
      if (event.defaultPrevented) return;
      navigate(id);
   };

   const profitString = getProfitString(attempt) ?? "";

   return (
      <div className="harvest-item">
         <Link
            to={`${id}`}
            state={{ page }}
            className="harvest-item-link d-block pt-3 pb-3"
            onClick={navigateToAttemptView}
         >
            <div className="row">
               <div className="col-3 fs-5 text-center">{total.yellow}</div>
               <div className="col-3 fs-5 text-center">{total.blue}</div>
               <div className="col-3 fs-5 text-center">{total.red}</div>
               <div className="col-3 fs-5 text-center ">{profitString}</div>
            </div>
         </Link>
         <DeleteButton onClick={deleteAttempt} className="harvest-delete-btn" />
      </div>
   );
};
