import { gap } from "@/utils/functions/functions";
import React, { type FC } from "react";
import { TextView, type TextViewProps } from "./TextView";

interface NumericViewProps extends Omit<TextViewProps, "value"> {
   value: number;
}

export const NumericView: FC<NumericViewProps> = ({ value, ...otherProps }) => {
   return <TextView value={gap(value)} {...otherProps} />;
};
