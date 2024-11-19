const ways = (n, jumps) => {
  // Time complexity:O(m*2^n)
  // Space Complexity:O(n)

  if (n < 0) return 0;
  if (n === 0) {
    return 1;
  }
  let nb = 0;
  for (const jump of jumps) {
    if (n - jump >= 0) {
      nb += ways(n - jump, jumps);
    }
  }
  return nb;
};

const waysDynamic = (n, jumps, lookup = {}) => {
  // Time complexity:O(nm)
  // Space Complexity:O(n)
  if (n < 0) return 0;
  if (n === 0) {
    return 1;
  }
  if (lookup[n]) return lookup[n];
  let nb = 0;
  for (const jump of jumps) {
    if (n - jump >= 0) {
      nb += waysDynamic(n - jump, jumps, lookup);
    }
    lookup[n] = nb;
  }
  return lookup[n];
};

const waysBottomUp = (n, jumps) => {
  // Time complexity:O(nm)
  // Space complexity:O(n)
  let dp = Array(n + 1).fill(0);
  //   Ways to step i, e.g. ways to step 0 is 1 (not jumping at all)
  dp[0] = 1;
  for (let i = 1; i < n + 1; i++) {
    for (const jump of jumps) {
      if (i - jump >= 0) {
        console.log({ i, jump });
        dp[i] += dp[i - jump];
        console.log(dp);
      }
    }
  }
  return dp[n];
};

// Bottom up
// dp =>              1 0 0 0 0 0 0 0 0 0
// i =2, jump = 2 =>  1 0 1 ...............

// i =3, jump = 2 =>  1 0 1 0..............

// i =4, jump = 2 =>  1 0 1 0 1..............
// i =4, jump = 4 =>  1 0 1 0 2..............

// i =5, jump = 2 =>  1 0 1 0 2 0.............
// i =5, jump = 4 =>  1 0 1 0 2 0.............
// i =5, jump = 5 =>  1 0 1 0 2 1.............

// i =6, jump = 2 =>  1 0 1 0 2 1 2............
// i =6, jump = 4 =>  1 0 1 0 2 1 3............
// i =6, jump = 5 =>  1 0 1 0 2 1 3............

// i =7, jump = 2 =>  1 0 1 0 2 1 3 1...........
// i =7, jump = 4 =>  1 0 1 0 2 1 3 1...........
// i =7, jump = 5 =>  1 0 1 0 2 1 3 2...........

// i =8, jump = 2 =>  1 0 1 0 2 1 3 2 3..........
// i =8, jump = 4 =>  1 0 1 0 2 1 3 2 5..........
// i =8, jump = 5 =>  1 0 1 0 2 1 3 2 5..........
// i =8, jump = 8 =>  1 0 1 0 2 1 3 2 6..........

// i =9, jump = 2 =>  1 0 1 0 2 1 3 2 6 2..........
// i =9, jump = 4 =>  1 0 1 0 2 1 3 2 6 3..........
// i =9, jump = 5 =>  1 0 1 0 2 1 3 2 6 5..........
// i =9, jump = 8 =>  1 0 1 0 2 1 3 2 6 5..........

// i =10 jump = 2 =>  1 0 1 0 2 1 3 2 6 5 6..........
// i =10 jump = 4 =>  1 0 1 0 2 1 3 2 6 5 9..........
// i =10 jump = 5 =>  1 0 1 0 2 1 3 2 6 5 10..........
// i =10 jump = 8 =>  1 0 1 0 2 1 3 2 6 5 11........... (END)

console.log(waysBottomUp(10, [2, 4, 5, 8]));
