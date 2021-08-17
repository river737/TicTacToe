import Paint from './rule-extend.js'

export default function detector(grid, size, wrapper) {
  const x = size - 5;
  for(let i = 0; i < size; i++) {
    for(let j = 0; j < size; j++) {
      let streak = {
        hori: 0,
        verti: 0,
        diag1: 0,
        diag2: 0
      }
      for(let k = 1; k < 5; k++) {
        if(j <= x && grid[i][j]!=='' && grid[i][j+k-1] === grid[i][j+k]) {
          streak.hori++;
          if(streak.hori === 4) {
            Paint({i, j, size, wrapper, type: 'hori'});
            streak.hori = 0;
            return {win: grid[i][j]}
          }
        }
        if(i <= x && grid[i][j]!=='' && grid[i+k-1][j] === grid[i+k][j]) {
           streak.verti++;
           if(streak.verti === 4) {
             Paint({i, j, size, wrapper, type: 'verti'});
             streak.verti = 0;
             return {win: grid[i][j]}
           }
        }
        if(i <= x && j <= x && grid[i][j]!=='' && grid[i+k-1][j+k-1] === grid[i+k][j+k]) {
           streak.diag1++;
           if(streak.diag1 === 4) {
             Paint({i, j, size, wrapper, type: 'diag1'});
             streak.diag1 = 0;
             return {win: grid[i][j]}
           }
        }
        if(i >= 4 && j <= x && grid[i][j]!=='' && grid[i-k+1][j+k-1] === grid[i-k][j+k]) {
           streak.diag2++;
           if(streak.diag2 === 4) {
             Paint({i, j, size, wrapper, type: 'diag2'});
             streak.diag2 = 0;
             return {win: grid[i][j]}
           }
        }
      }
    }
  }
  return {win: null}
}
