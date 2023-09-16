import { useAppDispatch, useAppSelector } from "@/store/store";
import React, { useState, type FC, type PropsWithChildren, type FormEvent } from "react";
import { HarvestView } from "./HarvestView";
import { type Nullable } from "@/types/default";
import { type IHarvestAverageAttempt } from "@@@/types/harvest/IHarvestSingleAttemptView";
import { getClassNameFromArray, toastError, toastSuccess } from "@/utils/functions/functions";
import { Button } from "@/components/ui/Button";
import { ModalProvider } from "@/providers/ModalProvider";
import { ModalAuto } from "@/components/modals/ModalAuto";
import { TextField } from "@/components/ui/form/TextField";
import { unwrapResult } from "@reduxjs/toolkit";
import harvestAsyncActions from "@/store/harvest/actions";
import { PortalModal } from "@/components/portal/PortalModal";
import { LightSpinner } from "@/components/ui/Spinner";

type AverageTab = "user" | "global" | string;

interface HarvestAveragesViewProps {}

export const HarvestAveragesView: FC<HarvestAveragesViewProps> = ({}) => {
   const { averageAttempts } = useAppSelector((state) => state.harvest);
   const dispatch = useAppDispatch();
   const [averageTab, setAverageTab] = useState<AverageTab>(() => {
      if (averageAttempts?.currentUser) return "user";
      if (averageAttempts?.global) return "global";
      return "";
   });
   const [isOtherUserShow, setIsOtherUserShow] = useState(false);
   const [otherUser, setOtherUser] = useState("");
   const [isLoadingOtherUser, setIsLoadingOtherUser] = useState(false);

   const getCurrentAverage = (): Nullable<IHarvestAverageAttempt> | undefined => {
      console.log({ averageTab });
      if (averageTab === "user") return averageAttempts?.currentUser.averageAttempt;
      if (averageTab === "global") return averageAttempts?.global.averageAttempt;
      if (averageTab) return averageAttempts?.otherUsers[averageTab].averageAttempt;
      return null;
   };

   const onChangeOtherUserHandler = (value: string): void => {
      setOtherUser(value);
   };

   const openOtherUserModal = (): void => {
      setIsOtherUserShow(true);
   };

   const closeOtherUserModal = (): void => {
      setIsOtherUserShow(false);
   };

   const fetchOtherUserAverage = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
      event.preventDefault();
      try {
         setIsLoadingOtherUser(true);
         const result = unwrapResult(await dispatch(harvestAsyncActions.getOtherUserAverageAttempt(otherUser)));
         setIsOtherUserShow(false);
         if (!result) toastSuccess("Пользователь не имеет попыток");
         else toastSuccess("Средние значения загружены");
      } catch (error) {
         toastError(error);
      } finally {
         setIsLoadingOtherUser(false);
      }
   };

   const currentAverage = getCurrentAverage();

   return (
      <div>
         <h3 className="mb-3 d-flex justify-content-between align-items-end">
            <span>Средние значения за воспоминание</span>
            {currentAverage?.attemptsCount && (
               <span className="fs-5">Всего воспоминаний: {currentAverage?.attemptsCount}</span>
            )}
         </h3>
         <ul className="nav  nav-pills d-flex justify-content-center mb-3">
            {averageAttempts?.currentUser && (
               <HarvestAverageTab
                  onClick={() => {
                     setAverageTab("user");
                  }}
                  active={averageTab === "user"}
               >
                  Мои
               </HarvestAverageTab>
            )}
            {averageAttempts?.global && (
               <HarvestAverageTab
                  onClick={() => {
                     setAverageTab("global");
                  }}
                  active={averageTab === "global"}
               >
                  Общие
               </HarvestAverageTab>
            )}
            {averageAttempts?.otherUsers && (
               <>
                  {Object.entries(averageAttempts.otherUsers).map(([key, value]) => (
                     <HarvestAverageTab
                        onClick={() => {
                           setAverageTab(key);
                        }}
                        active={averageTab === key}
                     >
                        {key}
                     </HarvestAverageTab>
                  ))}
               </>
            )}
         </ul>
         {currentAverage ? <HarvestView attempt={{ ...currentAverage, note: "" }} /> : <p>Нет средних значений</p>}
         <Button className="btn-success" onClick={openOtherUserModal}>
            Добавить пользователя
         </Button>

         {isOtherUserShow && (
            <ModalProvider close={closeOtherUserModal}>
               <ModalAuto>
                  <form onSubmit={fetchOtherUserAverage}>
                     <TextField
                        onChange={onChangeOtherUserHandler}
                        value={otherUser}
                        label="Введите nickname"
                        className="mb-3"
                     />
                     <Button className="btn-success">Добавить</Button>
                  </form>

                  {isLoadingOtherUser && (
                     <PortalModal>
                        <LightSpinner />
                     </PortalModal>
                  )}
               </ModalAuto>
            </ModalProvider>
         )}

         {}
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
