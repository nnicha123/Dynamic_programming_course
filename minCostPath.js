const minCostPathBottomUp = (matrix, i = 0, j = 0) => {
  // Recursive solution
  //   Time complexity: O(2^(n+m))
  //   Space complexity:O(n+m)
  let n = matrix.length;
  let m = matrix[0].length;

  if (i === n - 1 && j === m - 1) return matrix[i][j];
  else if (i === n - 1) {
    return matrix[i][j] + minCostPathBottomUp(matrix, i, j + 1);
  } else if (j === m - 1) {
    return matrix[i][j] + minCostPathBottomUp(matrix, i + 1, j);
  } else {
    return (
      matrix[i][j] +
      Math.min(
        minCostPathBottomUp(matrix, i + 1, j),
        minCostPathBottomUp(matrix, i, j + 1)
      )
    );
  }
};

const topDown = (matrix, i = 0, j = 0, lookup = {}) => {
  // Time complexity:O(n*m)
  // Space complexity:O(n*m)
  const lookupStr = i + "," + j;
  if (lookup[lookupStr]) return lookup[lookupStr];
  if (i === n - 1 && j === m - 1) return matrix[i][j];
  else if (i === n - 1) {
    lookup[lookupStr] =
      matrix[i][j] + minCostPathBottomUp(matrix, i, j + 1, lookup);
    return lookup[lookupStr];
  } else if (j === m - 1) {
    lookup[lookupStr] =
      matrix[i][j] + minCostPathBottomUp(matrix, i + 1, j, lookup);
    return lookup[lookupStr];
  } else {
    lookup[lookupStr] =
      matrix[i][j] +
      Math.min(
        minCostPathBottomUp(matrix, i + 1, j, lookup),
        minCostPathBottomUp(matrix, i, j + 1, lookup)
      );
    return lookup[lookupStr];
  }
};

const bottomUp = (matrix, i = 0, j = 0) => {
  // Time complexity: O(n*m)
  //  Space complexity: O(n*m)
  let n = matrix.length;
  let m = matrix[0].length;
  let dp = Array.from({ length: n }, () => Array(m).fill(0));
  dp[0][0] = matrix[0][0];
  for (let j = 1; j < m; j++) {
    dp[0][j] = matrix[0][j] + dp[0][j - 1];
  }
  for (let j = 1; j < n; j++) {
    dp[j][0] = matrix[j][0] + dp[j - 1][0];
  }
  for (let i = 1; i < n; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = matrix[i][j] + min(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  return dp[n - 1][m - 1];
};

const bottomUp2 = (matrix, i = 0, j = 0) => {
  // Time complexity: O(n*m)
  //  Space complexity: O(2m) => O(m)
  let prev_dp = new Array(matrix[0].length).fill(0);
  let dp = new Array(matrix[0].length).fill(0);
  prev_dp[0] = matrix[0][0];
  for (let j = 1; j < matrix[0].length; j++) {
    prev_dp[j] = matrix[0][j] + prev_dp[j - 1];
  }
  for (let i = 1; i < matrix.length; i++) {
    dp[0] = prev_dp[0] + matrix[i][0];
    for (let j = 1; j < matrix[0].length; j++) {
      dp[j] = matrix[(i, j)] + Math.min(prev_dp[j], dp[j - 1]);
    }
    prev_dp = dp;
    dp = new Array(matrix[0].length).fill(0);
  }
  return prev_dp[matrix[0].length - 1];
};
