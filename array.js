// @ts-check

// find => 특정 조건을 만족하는 첫번째 값을 리턴
// const findResult = numbers.find((number, index, arr) => number === 4);
// console.log(findResult);

// // findIndex => 특정 조건을 만족하는 첫번째 값의 index 를 리턴
// const findIndexResult = numbers.findIndex((number) => number === 3);
// console.log(findIndexResult);

// filter => 특정 조건을 만족하는 배열만을 리턴
// const filterResult = numbers.filter((number) => number % 2 === 1);
// console.log(filterResult);

// const rich = people.filter((el) => el.money > 300000);
// console.log(rich);

const people = [
  { name: 'Yuna', money: 500000 },
  { name: 'Bill', money: 400000 },
  { name: 'Jane', money: 300000 },
  { name: 'Roky', money: 200000 },
];

// map => 각각 요소에 무언가를 해서 리턴
// const mapResult = numbers.map((number) => number * 3);
// console.log(mapResult);

// const mapShow = numbers.map((number, index, arr) => {
//   console.log(number, index, arr);
//   return number * 3;
// });
// console.log(mapShow);

const numbers = [1, 2, 3, 4, 5];

// reduce => 각각 요소에 값의 합산을 리턴
const reduceResult = numbers.reduce((total, number) => total + number);
console.log(reduceResult);
