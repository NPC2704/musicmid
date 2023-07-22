import { createSelector } from "reselect";

const selectNumberArray = (state: any) => state.numberArray;

const computeSum = (numberArray: any) => {
  console.log("Đang tính tổng...");
  return numberArray.reduce((acc: any, num: any) => acc + num, 0);
};

export const selectSum = createSelector(selectNumberArray, computeSum);
