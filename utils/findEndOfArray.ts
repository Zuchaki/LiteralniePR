import { Status, Word } from "@/pages";

export const endOfArray = (array: Word[]) => {
  const currentTable = array.length - 1;
  return {
    outer: currentTable,
    inner: array[currentTable]?.length ?? 0,
  };
};
