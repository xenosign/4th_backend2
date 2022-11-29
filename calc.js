// @ts-check
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const sumAll = () => {
  const sum = arr.reduce((acc, num) => acc + num);
  return sum;
};

export { arr, sumAll };
