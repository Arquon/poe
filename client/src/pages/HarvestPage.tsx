import React, { useState, type FC, useEffect } from "react";
import { HarvestForm } from "@/components/harvest/form/HarvestForm";
import { HarvestTable } from "@/components/harvest/table/HarvestTable";
import { Button } from "@/components/ui/Button";
import { LightSpinner } from "@/components/ui/Spinner";
import { AuthRequire } from "@/hoc/AuthRequire";
import { ModalProvider } from "@/providers/ModalProvider";
import harvestAsyncActions from "@/store/harvest/actions";
import { useAppDispatch } from "@/store/store";
import { type IHarvestAttemptCreateRequest as IHarvestAttemptNewForm } from "@@@/types/api/harvest/IHarvestAttemptRequest";
import { unwrapResult } from "@reduxjs/toolkit";
import { ModalMedium } from "@/components/modals/MediumModal";
import { Outlet, useLocation, useMatch, useSearchParams } from "react-router-dom";
import { toastError, toastSuccess } from "@/utils/functions/functions";
import { ERoutes } from "@/router/router";
import { HarvestAveragesView } from "@/components/harvest/view/HarvestAveragesView";

interface HarvestPageProps {}

const HarvestPageComponent: FC<HarvestPageProps> = ({}) => {
   const [isModalFormShow, setIsModalFormShow] = useState(false);
   const [isLoadingAddAttempt, setIsLoadingAddAttempt] = useState(false);
   const [isLoadingAttempts, setIsLoadingAttempts] = useState(false);
   const [isModalViewShow, setIsModalViewShow] = useState(false);

   const [searchParams] = useSearchParams();
   const location = useLocation();

   // Get a specific query parameter
   const page = location.state?.page || Number(searchParams.get("page")) || 1;

   const dispatch = useAppDispatch();

   const isCurrentPage = useMatch({ path: ERoutes.harvest });

   const openModalForm = (): void => {
      setIsModalFormShow(true);
   };

   const closeModalForm = (): void => {
      setIsModalFormShow(false);
   };

   const openModalView = (): void => {
      setIsModalViewShow(true);
   };

   const closeModalView = (): void => {
      setIsModalViewShow(false);
   };

   const addAttempt = async (data: IHarvestAttemptNewForm): Promise<void> => {
      setIsLoadingAddAttempt(true);
      try {
         unwrapResult(await dispatch(harvestAsyncActions.addAttempt(data)));
         unwrapResult(await dispatch(harvestAsyncActions.getAverageAttempts()));
         toastSuccess("Попытка добавлена");
         setIsModalFormShow(false);
      } finally {
         setIsLoadingAddAttempt(false);
      }
   };

   async function fetchHarvestAttempts(): Promise<void> {
      try {
         setIsLoadingAttempts(true);
         unwrapResult(await dispatch(harvestAsyncActions.getAttempts(+page)));
      } catch (error) {
         toastError(error);
      } finally {
         setIsLoadingAttempts(false);
      }
   }

   async function fetchHarvestAverageAttempts(): Promise<void> {
      try {
         unwrapResult(await dispatch(harvestAsyncActions.getAverageAttempts()));
      } catch (error) {
         console.log(error);
      }
   }

   useEffect(() => {
      fetchHarvestAverageAttempts();
   }, []);

   useEffect(() => {
      fetchHarvestAttempts();
   }, [page]);

   return (
      <>
         <section className="harvest">
            <div className="container">
               <HarvestTable />
               <div className="row">
                  <div className="col-2">
                     <Button className="btn-success w-100" onClick={openModalForm}>
                        Добавить пробежку
                     </Button>
                  </div>
                  <div className="col-auto">
                     <Button className="btn-success w-100" onClick={openModalView}>
                        Просмотреть средние значения
                     </Button>
                  </div>
               </div>

               {isModalFormShow && (
                  <ModalProvider close={closeModalForm}>
                     <ModalMedium>
                        <HarvestForm onSubmit={addAttempt} buttonText="Добавить пробежку" />
                     </ModalMedium>

                     {isLoadingAddAttempt && (
                        <ModalProvider>
                           <LightSpinner />
                        </ModalProvider>
                     )}
                  </ModalProvider>
               )}

               {isModalViewShow && (
                  <ModalProvider close={closeModalView}>
                     <ModalMedium>
                        <HarvestAveragesView />
                     </ModalMedium>
                  </ModalProvider>
               )}

               <Outlet />
            </div>
         </section>
         {isCurrentPage && isLoadingAttempts && (
            <ModalProvider>
               <LightSpinner />
            </ModalProvider>
         )}
      </>
   );
};

export const HarvestPageAuth: FC<HarvestPageProps> = ({}) => {
   return (
      <AuthRequire>
         <HarvestPageComponent />
      </AuthRequire>
   );
};
