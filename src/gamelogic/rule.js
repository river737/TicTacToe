import Paint from './rule-extend.js'

export default function detector(grid, size) {
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
            const {pos} = Paint({i, j, size, type: 'hori'});
            streak.hori = 0;
            return {mark: grid[i][j], pos}
          }
        }
        if(i <= x && grid[i][j]!=='' && grid[i+k-1][j] === grid[i+k][j]) {
          streak.verti++;
          if(streak.verti === 4) {
            const {pos} = Paint({i, j, size, type: 'verti'});
            streak.verti = 0;
            return {mark: grid[i][j], pos}
          }
        }
        if(i <= x && j <= x && grid[i][j]!=='' && grid[i+k-1][j+k-1] === grid[i+k][j+k]) {
           streak.diag1++;
           if(streak.diag1 === 4) {
            const {pos} = Paint({i, j, size, type: 'diag1'});
             streak.diag1 = 0;
             return {mark: grid[i][j], pos}
           }
        }
        if(i >= 4 && j <= x && grid[i][j]!=='' && grid[i-k+1][j+k-1] === grid[i-k][j+k]) {
           streak.diag2++;
           if(streak.diag2 === 4) {
            const {pos} = Paint({i, j, size, type: 'diag2'});
             streak.diag2 = 0;
             return {mark: grid[i][j], pos}
           }
        }
      }
    }
  }
  return null
}
