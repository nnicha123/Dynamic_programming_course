const factorial = (n) => {
  if (n === 1) return 1;
  return n * factorial(n - 1);
};

const factorialTopDown = (n, lookup = {}) => {
  if (n === 1) return 1;
  if (lookup[n]) return lookup[n];
  lookup[n] = n * factorialTopDown(n - 1, lookup);
  return lookup[n];
};

const factorialBottomUp = (n) => {
  let result = 1;
  for (let i = 1; i <= n; i++) {
    result *= i;
  }
  return result;
};

console.log(factorialBottomUp(5));
