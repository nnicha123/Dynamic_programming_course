const fibonacci = (n) => {
  // Time complexity:O(2^n)
  // Space complexity:O(n) -> due to recursion stack
  if (n <= 1) return n;

  return fibonacci(n - 1) + fibonacci(n - 2);
};

const fibonacciTopDown = (n, lookup = undefined) => {
  // Time complexity:O(n)
  // Space complexity:O(n)
  if (!lookup) lookup = {};
  if (n <= 1) return n;
  if (lookup[n]) return lookup[n];
  lookup[n] = fibonacciTopDown(n - 1, lookup) + fibonacciTopDown(n - 2, lookup);
  return lookup[n];
};

const fibonacciBottomUp = (n) => {
  // Time complexity:O(n)
  // Space complexity:O(n)
  const arr = [0, 1];
  arr[0] = 0;
  arr[1] = 1;
  for (let i = 2; i < n + 1; i++) {
    arr[i] = arr[i - 2] + arr[i - 1];
  }
  return arr[n];
};

const fibonacciBottomUp2 = (n) => {
  // Time complexity:O(n)
  // Space complexity:O(1)
  let prev = 0;
  let current = 1;
  for (let i = 2; i < n + 1; i++) {
    let tmp = current;
    current = prev + current;
    prev = tmp;
  }
  return current;
};

console.log(fibonacciBottomUp2(8));
