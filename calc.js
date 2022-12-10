// @ts-check
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function sumAll() {
  // 메소드
  const sum = arr.reduce((acc, num) => acc + num, 0);
  console.log('!!');
  return sum;
}

export { arr, sumAll };
