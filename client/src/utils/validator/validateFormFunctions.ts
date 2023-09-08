import { type IHarvestMapValues } from "@@@/types/harvest/IHarvestMapValues";

export function validateHarvestMap(map: IHarvestMapValues): boolean {
   if (!map.quantity) return true;

   const { result } = map;
   const { blue, red, yellow } = result;
   if (!blue || !red || !yellow) return true;

   return false;
}
