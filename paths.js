const paths = (matrix, i = 0, j = 0) => {
  // Time complexity: O(2^(n+m))
  // Space complexity: O(n+m)
  let n = matrix.length;
  let m = matrix[0].length;
  if (i === n || j === m || matrix[i][j] === 1) {
    return 0;
  }
  if (i === n - 1 && j === m - 1) return 1;
  return paths(matrix, i, j + 1) + paths(matrix, i + 1, j);
};

// n=4, m=5

// coordinates at which matrix[i][j] === 1 -> (0,2) (0,4) (1,4) (2,2) (3,0)

// i=0, j=0
// i=0,j=1  i=1,j=0
// i=1,j=1  i=1,j=1, i=2,j=0
// i=1,j=2 i=2,j=1 i=1,j=2 i=2,j=1 i=2,j=1
// i=1,j=3 i=1,j=3 i=3,j=1 i=3,j=1 i=3,j=1
// i=2,j=3 i=2,j=3 i=3,j=2 i=3,j=2 i=3,j=2
// i=2,j=4 i=3,j=3 i=2,j=4 i=3,j=3 i=3,j=3 i=3,j=3 i=3,j=3
// i=3,j=3 i=3,j=3 1 1 1 1 1
// 1 1 1 1 1 1 1 => 7

const topDown = (matrix, i = 0, j = 0, lookup = {}) => {
  // Time complexity: O(n*m)
  // Space complexity: O(n*m)
  const n = matrix.length;
  const m = matrix[0].length;
  const lookupStr = i + "," + j;
  if (lookup[lookupStr]) return lookup[lookupStr];
  if (i === n || j === m || matrix[i][j] === 1) {
    return 0;
  }
  if (i === n - 1 && j === m - 1) return 1;
  lookup[lookupStr] =
    topDown(matrix, i + 1, j, lookup) + topDown(matrix, i, j + 1, lookup);
  return lookup[lookupStr];
};

const bottomUp = (matrix) => {
  // Time complexity: O(n*m)
  // Space complexity: O(n*m)
  let n = matrix.length;
  let m = matrix[0].length;
  let dp = Array.from({ length: n }, () => Array(m).fill(0));
  dp[0][0] = noWallReturn1(matrix[0][0], 1);
  for (let j = 1; j < m; j++) {
    dp[0][j] = noWallReturn1(matrix[0][j], dp[0][j - 1]);
  }
  for (let i = 1; i < n; i++) {
    dp[i][0] = noWallReturn1(matrix[i][0], dp[i - 1][0]);
  }
  for (let i = 1; i < n; i++) {
    for (let j = 1; j < m; j++) {
      const val = dp[i - 1][j] + dp[i][j - 1];
      dp[i][j] = noWallReturn1(matrix[i][j], val);
    }
  }
  return dp[n - 1][m - 1];
};

const bottomUp2 = (matrix) => {
  let n = matrix.length;
  let m = matrix[0].length;
  let prev_dp = Array(m).fill(0);
  let dp = Array(m).fill(0);

  prev_dp[0] = noWallReturn1(matrix[0][0], 1);

  for (let j = 1; j < m; j++) {
    prev_dp[j] = noWallReturn1(matrix[0][j], prev_dp[j - 1]);
  }

  for (let i = 1; i < n; i++) {
    dp[0] = noWallReturn1(matrix[i][0], prev_dp[0]);
    for (let j = 1; j < m; j++) {
      const val = prev_dp[j] + dp[j - 1];
      dp[j] = noWallReturn1(matrix[i][j], val);
    }
    prev_dp = dp;
    dp = Array(m).fill(0);
  }
  return prev_dp[m - 1];
};

const noWallReturn1 = (matrixValue, valueToReturn) => {
  return matrixValue === 0 ? valueToReturn : 0;
};

let matrix = [
  [0, 0, 1, 0, 1],
  [0, 0, 0, 0, 1],
  [0, 0, 1, 0, 0],
  [1, 0, 0, 0, 0],
];

console.log(bottomUp2(matrix));
