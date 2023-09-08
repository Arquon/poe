import { type ICommonTextInputProps } from "@/types/ui/ICommonInputProps";
import { getClassNameFromArray } from "@/utils/functions";
import React, { useRef, type FC, type ChangeEvent, type ComponentProps } from "react";

interface TextFieldOwnProps extends ICommonTextInputProps {
   type?: "text" | "password" | "number";
   blockClassName?: string;
}

type TextFieldProps = TextFieldOwnProps & Omit<ComponentProps<"input">, keyof TextFieldOwnProps>;

export const TextField: FC<TextFieldProps> = ({ value, type = "text", label, error, onChange, blockClassName, ...otherProps }) => {
   const inputRef = useRef<HTMLInputElement>(null);

   const onClickLabelHandler = (): void => {
      if (!inputRef.current) return;
      inputRef.current.focus();
   };

   const onChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
      onChange(event.target.value);
   };

   const inputClassName = ["form-control"];

   if (error) {
      inputClassName.push("is-invalid");
   }

   const isErrorString = typeof error === "string";

   return (
      <div className={blockClassName}>
         {label && (
            <label className="form-label" onClick={onClickLabelHandler}>
               {label}
            </label>
         )}

         <div className="input-group">
            <input
               type={type}
               className={getClassNameFromArray(inputClassName)}
               onChange={onChangeHandler}
               value={value}
               ref={inputRef}
               {...otherProps}
            />

            {isErrorString && <div className="invalid-feedback">{error}</div>}
         </div>
      </div>
   );
};

type TextNumberFieldProps = Omit<TextFieldProps, "onChange" | "value"> & {
   onChange: (value: number) => void;
   value: number | string;
};

export const TextNumericField: FC<TextNumberFieldProps> = ({ onChange, value, ...otherProps }) => {
   const onChangeHandler = (value: string): void => {
      onChange(+value);
   };

   return <TextField onChange={onChangeHandler} value={String(value)} {...otherProps} />;
};
