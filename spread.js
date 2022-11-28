// @ts-check
function spread(first, second, ...rest) {
  console.log(first, second);
  console.log(rest);
}

spread(1, 2, 3, 4, 5);
