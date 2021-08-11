import Paint from './rule-extend.js'

export default function detector(grid, size, wrapper) {
  console.log(grid)
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
        if(j <= x && grid[i][j].fill!=='' && grid[i][j+k-1].fill === grid[i][j+k].fill) {
          streak.hori++;
          if(streak.hori === 4) {
            Paint(i, j, grid, size, wrapper, 'hori');
            streak.hori = 0;
            return {win: grid[i][j].fill}
          }
        }
        if(i <= x && grid[i][j].fill!=='' && grid[i+k-1][j].fill === grid[i+k][j].fill) {
           streak.verti++;
           if(streak.verti === 4) {
             Paint(i, j, grid, size, wrapper, 'verti');
             streak.verti = 0;
             return {win: grid[i][j].fill}
           }
        }
        if(i <= x && j <= x && grid[i][j].fill!=='' && grid[i+k-1][j+k-1].fill === grid[i+k][j+k].fill) {
           streak.diag1++;
           if(streak.diag1 === 4) {
             Paint(i, j, grid, size, wrapper, 'diag1');
             streak.diag1 = 0;
             return {win: grid[i][j].fill}
           }
        }
        if(i >= 4 && j <= x && grid[i][j].fill!=='' && grid[i-k+1][j+k-1].fill === grid[i-k][j+k].fill) {
           streak.diag2++;
           if(streak.diag2 === 4) {
             Paint(i, j, grid, size, wrapper, 'diag2');
             streak.diag2 = 0;
             return {win: grid[i][j].fill}
           }
        }
      }
    }
  }
  return {win: null}
}
