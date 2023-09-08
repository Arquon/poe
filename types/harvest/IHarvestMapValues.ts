export interface IHarvestMapLifeForceCount {
   yellow: number;
   blue: number;
   red: number;
}

export interface IHarvestMapValues {
   result: IHarvestMapLifeForceCount;
   quantity: number;
   order: number;
}

export type THarvestAttemptsMaps = [IHarvestMapValues, IHarvestMapValues, IHarvestMapValues, IHarvestMapValues];

export type THarvestNewMap = Omit<IHarvestMapValues, "id">;
