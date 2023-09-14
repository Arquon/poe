export function round(val: number | string, res: number = 2): number {
   if (res === 0) return Math.round(+val);
   return Math.round(10 ** res * +val) / 10 ** res;
}
