import { type ICommonTextInputProps } from "@/types/ui/ICommonInputProps";
import { getClassNameFromArray } from "@/utils/functions/functions";
import { floatRegex, intRegex } from "@/utils/regex";
import React, { useRef, type FC, type ChangeEvent, type ComponentProps, useState } from "react";

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
   className,
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

   if (error && !readOnly) inputClassName.push("is-invalid");

   if (className) inputClassName.push(className);

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
   insertHandler?: (value: string) => string;
}

export const TextNumericField: FC<TextNumberFieldProps> = ({
   onChange,
   value: propValue,
   float,
   placeholder,
   insertHandler,
   ...otherProps
}) => {
   const [inputValue, setInputValue] = useState(String(propValue));

   const regex = float ? floatRegex : intRegex;

   const onChangeHandler = (value: string): void => {
      if (insertHandler) value = insertHandler(value);
      if (value.at(-1) === ",") value = value.slice(0, -1) + ".";
      if (regex.test(value)) {
         setInputValue(value);
         onChange(+value);
      }
   };

   return (
      <TextField
         onChange={onChangeHandler}
         value={String(inputValue)}
         placeholder={placeholder ? String(placeholder) : undefined}
         {...otherProps}
      />
   );
};
