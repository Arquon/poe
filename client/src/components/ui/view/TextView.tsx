import { getClassNameFromArray } from "@/utils/functions/functions";
import React, { type FC } from "react";

export interface TextViewProps {
   value: string;
   className?: string;
   label?: string;
}

export const TextView: FC<TextViewProps> = ({ value, label, className }) => {
   const computedClassName = ["view-block"];

   if (className) computedClassName.push(className);

   return (
      <div className={getClassNameFromArray(computedClassName)}>
         <span>{label}</span>
         <p>{value}</p>
      </div>
   );
};
