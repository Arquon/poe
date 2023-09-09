import { getClassNameFromArray } from "@/utils/functions/functions";
import React, { type ElementType, type ComponentProps } from "react";

interface ButtonOwnProps<E extends ElementType = ElementType> {
   as?: E;
}

export type ButtonProps<E extends ElementType> = ButtonOwnProps<E> & Omit<ComponentProps<E>, keyof ButtonOwnProps>;
const defaultElement = "button";

export const Button = <E extends ElementType = typeof defaultElement>({
   children,
   as,
   ...otherProps
}: ButtonProps<E>): JSX.Element => {
   const TagName = as ?? defaultElement;
   const arrayedClassName = ["btn"];
   const { className } = otherProps;
   if (className) {
      arrayedClassName.push(className);
   }

   return (
      <TagName {...otherProps} className={getClassNameFromArray(arrayedClassName)}>
         {children}
      </TagName>
   );
};

export const DeleteButton = <E extends ElementType = typeof defaultElement>(props: ButtonProps<E>): JSX.Element => {
   const arrayClassName = ["btn-delete btn-danger"];
   const { className } = props;
   if (className) {
      arrayClassName.push(className);
   }
   return (
      <Button {...props} className={getClassNameFromArray(arrayClassName)}>
         &times;
      </Button>
   );
};
