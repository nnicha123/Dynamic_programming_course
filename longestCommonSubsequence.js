const lcs = (s1, s2, i = 0, j = 0) => {
  // Time complexity O(2^(n+m))
  //  Space complexity O(n+m)
  if (i === s1.length || j === s2.length) return 0;
  if (s1[i] === s2[j]) {
    return 1 + lcs(s1, s2, i + 1, j + 1);
  } else {
    return Math.max(lcs(s1, s2, i + 1, j), lcs(s1, s2, i, j + 1));
  }
};

const lcsDynamic = (s1, s2, i = 0, j = 0, lookup = {}) => {
  // Time complexity: O(nm)
  // Space complexity: O(nm)
  const lookupInd = i + "," + j;
  if (i === s1.length || j === s2.length) return 0;
  if (lookup[lookupInd]) return lookup[lookupInd];
  if (s1[i] === s2[j]) {
    lookup[lookupInd] = 1 + lcs(s1, s2, i + 1, j + 1);
  } else {
    lookup[lookupInd] = Math.max(lcs(s1, s2, i + 1, j), lcs(s1, s2, i, j + 1));
  }
  return lookup[lookupInd];
};

const lcsBottomUp = (s1, s2) => {
  // Time complexity: O(nm)
  // Space complexity: O(nm)

  let dp = Array.from({ length: s1.length + 1 }, () =>
    Array(s2.length + 1).fill(0)
  );
  for (let i = 1; i < s1.length + 1; i++) {
    for (let j = 1; j < s2.length + 1; j++) {
      if (s1.charAt(i - 1) === s2.charAt(j - 1)) {
        dp[i][j] = 1 + dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  return dp[s1.length][s2.length];
};

const lcsBottomUpOptimized = (s1, s2) => {
  let prev_dp = Array(s2.length + 1).fill(0);
  let dp = Array(s2.length + 1).fill(0);
  for (let i = 1; i < s1.length + 1; i++) {
    for (let j = 1; j < s2.length + 1; j++) {
      let s1Ch = s1[i - 1];
      let s2Ch = s2[j - 1];
      if (s1[i - 1] === s2[j - 1]) {
        console.log(prev_dp[j - 1]);
        console.log("here");
        dp[j] = 1 + prev_dp[j - 1];
      } else {
        dp[j] = Math.max(prev_dp[j], dp[j - 1]);
      }
      let currentCount = dp[j];
      console.log({ s1Ch, s2Ch, currentCount });
    }
    prev_dp = dp;
    dp = Array(s2.length + 1).fill(0);
  }
  return prev_dp[s2.length];
};

const s1 = "abdacbab";
const s2 = "acebfca";
console.log(lcsBottomUpOptimized(s1, s2));

//     a c e b f c a
//   0 0 0 0 0 0 0 0
// a 0 1 1 1 1 1 1 1
// b 0 1 1 1 2 2 2 2
// d 0 1 1 1 2 2 2 2
// a 0 1 1 1 2 2 2 3
// c 0 1 2 2 2 2 3 3
// b 0 1 2 2 3 3 3 3
// a 0 1 2 2 3 3 3 4
// b 0 1 2 2 3 3 3 4
