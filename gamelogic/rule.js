import Paint from './rule-extend.js'

export default function detector(grid_size, win_quant, grid, newgrid) {
  const x = grid_size - win_quant;
  for(let i = 0; i < grid_size; i++) {
    for(let j = 0; j < grid_size; j++) {
      let streak = {
        hori: 0,
        verti: 0,
        diag1: 0,
        diag2: 0
      }
      for(let k = 1; k < win_quant; k++) {
        if(j <= x && newgrid[i][j]!=='' && newgrid[i][j+k-1] === newgrid[i][j+k]) {
          streak.hori++;
          if(streak.hori === win_quant-1) {
            Paint(i, j, grid, win_quant, 'hori');
            streak.hori = 0;
            return {win: true}
          }
        } else if(i <= x && newgrid[i][j]!=='' && newgrid[i+k-1][j] === newgrid[i+k][j]) {
           streak.verti++;
           if(streak.verti === win_quant-1) {
             Paint(i, j, grid, win_quant, 'verti');
             streak.verti = 0;
             return {win: true}
           }
        } else if(i <= x && j <= x && newgrid[i][j]!=='' && newgrid[i+k-1][j+k-1] === newgrid[i+k][j+k]) {
           streak.diag1++;
           if(streak.diag1 === win_quant-1) {
             Paint(i, j, grid, win_quant, 'diag1');
             streak.diag1 = 0;
             return {win: true}
           }
        } else if(i >= win_quant-1 && j <= x && newgrid[i][j]!=='' && newgrid[i-k+1][j+k-1] === newgrid[i-k][j+k]) {
           streak.diag2++;
           if(streak.diag2 === win_quant-1) {
             Paint(i, j, grid, win_quant, 'diag2');
             streak.diag2 = 0;
             return {win: true}
           }
        }
      }
    }
  }
  return {win: null}
}
