import React, { useState, type FC } from "react";
import { HarvestForm } from "@/components/harvest/HarvestForm";
import { HarvestTable } from "@/components/harvest/HarvestTable";
import { Button } from "@/components/ui/Button";
import { LightSpinner } from "@/components/ui/Spinner";
import { AuthRequire } from "@/hoc/AuthRequire";
import { ModalProvider } from "@/providers/ModalProvider";
import harvestActions from "@/store/harvest/actions";
import { useAppDispatch } from "@/store/store";
import { type IHarvestAttemptNewRequest as IHarvestAttemptNewForm } from "@@@/types/api/harvest/IHarvestAttemptRequest";
import { unwrapResult } from "@reduxjs/toolkit";
import { ModalMedium } from "@/components/modals/MediumModal";

interface HarvestPageProps {}

const HarvestPage: FC<HarvestPageProps> = ({}) => {
   const [isModalFormShow, setIsModalFormShow] = useState(false);
   const [isLoadingAddAttempt, setIsLoadingAddAttempt] = useState(false);
   const dispatch = useAppDispatch();

   const openModalForm = (): void => {
      setIsModalFormShow(true);
   };

   const closeModalForm = (): void => {
      setIsModalFormShow(false);
   };

   const addAttempt = async (data: IHarvestAttemptNewForm): Promise<void> => {
      setIsLoadingAddAttempt(true);
      try {
         unwrapResult(await dispatch(harvestActions.addAttempt(data)));
      } finally {
         setIsLoadingAddAttempt(false);
      }
   };

   return (
      <section className="harvest">
         <div className="container">
            <HarvestTable />
            <div className="row">
               <div className="col-2">
                  <Button className="btn-success" onClick={openModalForm}>
                     Добавить пробежку
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
         </div>
      </section>
   );
};

export const HarvestPageAuth: FC<HarvestPageProps> = ({}) => {
   return (
      <AuthRequire>
         <HarvestPage />
      </AuthRequire>
   );
};
