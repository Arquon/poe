export interface IHarvestMapLifeForceCount {
   yellow: number;
   blue: number;
   red: number;
}

export interface IHarvestMapValues {
   result: IHarvestMapLifeForceCount;
   quantity: number;
   order: number;
   id: string;
}

export type IHarvestMapValuesWithoutId = Omit<IHarvestMapValues, "id">;
