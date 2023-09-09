import { type URLSearchParamsInit, createSearchParams, useNavigate } from "react-router-dom";

type UseNavigateSearchReturnType = (pathname: string, params?: URLSearchParamsInit) => void;

export function useNavigateSearch(): UseNavigateSearchReturnType {
   const navigate = useNavigate();
   return (pathname: string, params?: URLSearchParamsInit) => {
      navigate({ pathname, search: `?${createSearchParams(params).toString()}` });
   };
}
