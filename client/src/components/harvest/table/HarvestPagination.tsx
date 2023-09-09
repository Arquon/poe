import { getClassNameFromArray } from "@/utils/functions/functions";
import React, { type PropsWithChildren, type FC } from "react";
import { useSearchParams } from "react-router-dom";

interface HarvestPaginationProps {
   total: number;
   attemptsInPage: number;
}

export const HarvestPagination: FC<HarvestPaginationProps> = ({ total, attemptsInPage }) => {
   const [searchParams, setSearchParams] = useSearchParams();

   const page = searchParams.get("page") ?? 1;

   const onClickHandler = (page: number): void => {
      setSearchParams({ page: String(page) });
   };

   const pagesCount = Math.ceil(total / attemptsInPage);
   const array = new Array(pagesCount).fill(0);

   return (
      <div className="harvest-table-pagination">
         <nav aria-label="Page navigation example ">
            <ul className="pagination d-flex justify-content-center">
               {array.length !== 1 &&
                  array.map((_, index) => (
                     <HarvestPaginationItem
                        key={index}
                        active={+page === index + 1}
                        onClick={() => {
                           onClickHandler(index + 1);
                        }}
                     >
                        {index + 1}
                     </HarvestPaginationItem>
                  ))}
            </ul>
         </nav>
      </div>
   );
};

interface HarvestPaginationItemProps extends PropsWithChildren {
   onClick: () => void;
   active: boolean;
}

const HarvestPaginationItem: FC<HarvestPaginationItemProps> = ({ children, active, onClick }) => {
   const pageLinkClassName = ["page-link"];

   if (active) {
      pageLinkClassName.push("active");
   }

   return (
      <li className="page-item" onClick={onClick}>
         <a className={getClassNameFromArray(pageLinkClassName)}>{children}</a>
      </li>
   );
};
