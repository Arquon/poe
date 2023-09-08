import type React from "react";
import { useEffect } from "react";

// eslint-disable-next-line @typescript-eslint/ban-types
export function useOutsideClick(ref: React.RefObject<HTMLElement>, fn: Function): void {
   useEffect(() => {
      function handleClickOutside(event: MouseEvent): void {
         if (ref.current && !ref.current.contains(event.target as Node)) {
            fn();
         }
      }

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, [ref]);
}
