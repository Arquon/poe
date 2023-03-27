import { createSlice } from "@reduxjs/toolkit";
import { type IHarvestRunAttempt } from "@@@/types/harvest/IHarvestRunAttempt";
import { type IHarvestPrices } from "@@@/types/harvest/IHarvestPrices";

interface IHarvestState {
   runs: IHarvestRunAttempt[];
   prices: IHarvestPrices;
}

const defaultHarvestPrices: IHarvestPrices = {
   yellowDivinePrice: 8000,
   blueDivinePrice: 8000,
   redDivinePrice: 8000,
   memoryDivinePrice: 1,
};

const runsMock: IHarvestRunAttempt[] = [
   {
      maps: [
         {
            blueCount: 8000,
            yellowCount: 8000,
            redCount: 8000,
            mapQuantity: 100,
         },
         {
            blueCount: 8000,
            yellowCount: 8000,
            redCount: 8000,
            mapQuantity: 100,
         },
         {
            blueCount: 8000,
            yellowCount: 8000,
            redCount: 8000,
            mapQuantity: 100,
         },
         {
            blueCount: 8000,
            yellowCount: 8000,
            redCount: 8000,
            mapQuantity: 100,
         },
      ],
      id: 0,
      profit: 1,
   },
];

const initialState: IHarvestState = {
   runs: runsMock,
   prices: defaultHarvestPrices,
};

const harvestSlice = createSlice({
   name: "harvest",
   initialState,
   reducers: {},
});

const { actions: harvestActions, reducer: harvestReducer } = harvestSlice;
export { harvestActions };
export default harvestReducer;
