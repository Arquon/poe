import { HarvestTable } from "@/components/harvest/HarvestTable";
import React, { type FC } from "react";

interface HarvestPageProps {}

export const HarvestPage: FC<HarvestPageProps> = ({}) => {
   return (
      <section className="harvest">
         <HarvestTable />
      </section>
   );
};
