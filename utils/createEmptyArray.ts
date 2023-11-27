const createEmptyArray = (row: number, col: number) => {
  const arr: null[][] = [];

  for (let i = 0; i < col; i += 1) {
    arr[i] = [];

    for (let j = 0; j < row; j += 1) {
      arr[i][j] = null;
    }
  }

  return arr;
};

export default createEmptyArray;
