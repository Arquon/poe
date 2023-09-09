import { type ICommonTextInputProps } from "@/types/ui/ICommonInputProps";
import { getClassNameFromArray } from "@/utils/functions/functions";
import { floatRegex, intRegex } from "@/utils/regex";
import React, { useRef, type FC, type ChangeEvent, type ComponentProps } from "react";

interface TextFieldOwnProps extends ICommonTextInputProps {
   type?: "text" | "password" | "number";
   blockClassName?: string;
}

type TextFieldProps = TextFieldOwnProps & Omit<ComponentProps<"input">, keyof TextFieldOwnProps>;

export const TextField: FC<TextFieldProps> = ({
   value,
   type = "text",
   label,
   error,
   onChange,
   blockClassName,
   readOnly,
   ...otherProps
}) => {
   const inputRef = useRef<HTMLInputElement>(null);

   const onClickLabelHandler = (): void => {
      if (!inputRef.current) return;
      inputRef.current.focus();
   };

   const onChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
      onChange(event.target.value);
   };

   const inputClassName = ["form-control"];

   if (error && !readOnly) {
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

            {isErrorString && !readOnly && <div className="invalid-feedback">{error}</div>}
         </div>
      </div>
   );
};

interface TextNumberFieldProps extends Omit<TextFieldProps, "onChange" | "value" | "placeholder"> {
   onChange: (value: number) => void;
   value: number | string;
   float?: boolean;
   placeholder?: number;
}

export const TextNumericField: FC<TextNumberFieldProps> = ({ onChange, value, float, placeholder, ...otherProps }) => {
   const regex = float ? floatRegex : intRegex;

   const onChangeHandler = (value: string): void => {
      if (regex.test(value)) onChange(+value);
   };

   return (
      <TextField
         onChange={onChangeHandler}
         value={String(value)}
         placeholder={placeholder ? String(placeholder) : undefined}
         {...otherProps}
      />
   );
};
