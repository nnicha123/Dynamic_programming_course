// Recursive
const rob = (arr, i = 0) => {
  // Time complexity: O(2^n)
  //   Space complexity: O(n)
  if (arr.length === 1) return arr[0];
  if (i >= arr.length) return 0;
  return Math.max(arr[i] + rob(arr, i + 2), rob(arr, i + 1));
};

// input: arr = [2, 10, 3, 6, 8, 1, 7] arr.length = 7
// output: 25

// i=0 => Math.max(arr[0] + rob(arr,2), rob(arr,1)) = Math.max(2 + 18, 25) = 25

// rob(arr,1) => Math.max(arr[1] + rob(arr,3), rob(arr,2)) = Math.max(10 + 15, 18) = 25
// rob(arr,2) => Math.max(arr[2] + rob(arr,4), rob(arr,3)) = Math.max(3 + 15, 15) = 18

// rob(arr,3) => Math.max(arr[3] + rob(arr,5), rob(arr,4)) = Math.max(6 + 7, 15) = 15
// rob(arr,4) => Math.max(arr[4] + rob(arr,6), rob(arr,5)) = Math.max(8 + 7, 7) = 15

// rob(arr,5) => Math.max(arr[5] + rob(arr,7), rob(arr,6)) = Math.max(arr[5] + 0, 7) = 7
// rob(arr,6) => Math.max(arr[6] + rob(arr,8), rob(arr,7)) = Math.max(arr[6] + 0,0) = 7

const robTopDown = (arr, i = 0, lookup = {}) => {
  // Time complexity: O(n)
  //   Space complexity: O(n)
  if (i >= arr.length) return 0;
  if (lookup[i]) return lookup[i];
  lookup[i] = Math.max(
    arr[i] + robTopDown(arr, i + 2, lookup),
    robTopDown(arr, i + 1, lookup)
  );
  return lookup[i];
};

const bottomUp = (arr) => {
  // Time complexity: O(n)
  // Space complexity: O(n)
  let dp = Array(arr.length).fill(0);
  dp[0] = arr[0];
  dp[1] = Math.max(arr[0], arr[1]);
  for (let i = 2; i < arr.length; i++) {
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + arr[i]);
  }
  return dp[arr.length - 1];
};

const bottomUp2 = (arr) => {
  // Time complexity: O(n)
  // Space complexity: O(1)
  prev = arr[0];
  current = Math.max(arr[0], arr[1]);
  for (let i = 2; i < arr.length; i++) {
    const tmp = current;
    current = Math.max(current, prev + arr[i]);
    prev = tmp;
  }
  return current;
};

console.log(bottomUp2([2, 10, 3, 6, 8, 1, 7]));
