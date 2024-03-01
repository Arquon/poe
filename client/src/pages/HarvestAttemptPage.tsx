import { HarvestForm } from "@/components/harvest/form/HarvestForm";
import { HarvestView } from "@/components/harvest/view/HarvestView";
import { ModalMedium } from "@/components/modals/ModalMedium";
import { LightSpinner } from "@/components/ui/Spinner";
import { type IHarvestAttemptForm } from "@/form/harvest.form";
import { useFetchAbortEffect } from "@/hooks/useFetchAbortEffect";
import { useNavigateSearch } from "@/hooks/useNavigateSearch";
import { ModalProvider } from "@/providers/ModalProvider";
import { ERoutes } from "@/router/router";
import harvestAsyncActions from "@/store/harvest/actions";
import { harvestSyncActions } from "@/store/harvest/slice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { toastError, toastSuccess } from "@/utils/functions/functions";
import { unwrapResult } from "@reduxjs/toolkit";
import React, { useState, type FC } from "react";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";

interface HarvestAttemptPageProps {}

const HarvestAttemptPageComponent: FC<HarvestAttemptPageProps> = () => {
   const { user } = useAppSelector((state) => state.user);
   const { currentAttempt } = useAppSelector((state) => state.harvest);
   const [isLoadingUpdateAttempt, setIsLoadingUpdateAttempt] = useState(false);
   const [isLoadingAttempt, setIsLoadingAttempt] = useState(true);
   const { id } = useParams();

   const navigate = useNavigate();

   const dispatch = useAppDispatch();

   if (!id) return <Navigate to={ERoutes.harvest} />;
   if (!user) return <Navigate to={ERoutes.landing} />;

   const fetchHarvestAttempt = async (signal?: AbortSignal): Promise<void> => {
      try {
         setIsLoadingAttempt(true);
         unwrapResult(await dispatch(harvestAsyncActions.getSingleAttempt({ attemptId: +id, signal })));
      } catch (error) {
         toastError(error);
         navigate(ERoutes.harvest);
      } finally {
         setIsLoadingAttempt(false);
      }
   };

   useFetchAbortEffect((signal) => {
      fetchHarvestAttempt(signal);
   }, []);

   const updateAttempt = async (data: IHarvestAttemptForm): Promise<void> => {
      if (!currentAttempt.id) throw "id missed";
      setIsLoadingUpdateAttempt(true);
      try {
         unwrapResult(await dispatch(harvestAsyncActions.updateAttempt({ ...data, id: currentAttempt.id })));
         unwrapResult(await dispatch(harvestAsyncActions.getCurrentUserAverageAttempts({})));
         toastSuccess("Попытка обновлена");
      } finally {
         setIsLoadingUpdateAttempt(false);
      }
   };

   return (
      <>
         {!isLoadingAttempt && (
            <ModalMedium>
               {user.id === currentAttempt.userId && (
                  <HarvestForm onSubmit={updateAttempt} buttonText="Обновить пробежку" />
               )}
               {user.id !== currentAttempt.userId && <HarvestView attempt={currentAttempt} />}
            </ModalMedium>
         )}

         {(isLoadingAttempt || isLoadingUpdateAttempt) && (
            <ModalProvider>
               <LightSpinner />
            </ModalProvider>
         )}
      </>
   );
};

interface IHarvestPageProps {}

export const HarvestAttemptPage: FC<IHarvestPageProps> = () => {
   const navigate = useNavigateSearch();
   const location = useLocation();
   const dispatch = useAppDispatch();

   const closeModal = (): void => {
      const params = location.state?.page && location.state.page !== 1 ? { page: location.state?.page } : undefined;
      dispatch(harvestSyncActions.resetAttempt());
      navigate(ERoutes.harvest, params);
   };

   return (
      <ModalProvider close={closeModal}>
         <HarvestAttemptPageComponent />
      </ModalProvider>
   );
};
