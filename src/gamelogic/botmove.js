let arr = ['o', 'x'];
export default function botmove(x, grids, size, type, level, move = 1) {
  if((type === 'hint' && x==='o')||(type !== 'hint' && x==='x')) {
    arr = ['o', 'x'];
  } else if((type === 'hint' && x==='x')||(type !== 'hint' && x==='o')) {
    arr = ['x', 'o'];
  }
  if(x==='o' && move===0) {
    move++;
    return {i:10, j:10}
  } else {
    let g = 1, m = 0, q = 0;
    switch(level) {
      case 'easy':
        g = 2;
        break;
      case 'medium':
        g = 1;
        break;
      case 'hard':
        g = 1;
        m = 1;
        break;
      default:
        g = 1;
        break;
    }
    for(g; g < 4; g++) {
      for(let i=0; i<size; i++) {
        for(let j=0; j<size; j++) {
          let l = 4-g;
          for(let k = 0; k < 2; k++) {
            let streak = {
              hori: 0,
              verti: 0,
              diag1: 0,
              diag2: 0,
              newhori: 0,
              newverti: 0,
              newdiag1: 0,
              newdiag2: 0,
              hori1: 0,
              verti1: 0,
              diag11: 0,
              diag21: 0
            }
            for(let n=1; n<l+1; n++) {
              if(l>1 && m) {
                if(l===2) q = 1;
                for(let w = 1; w < 4-q; w++) {
                  if(j>0 && j<size-l-1 && grids[i][j]===arr[k] && n!==w && grids[i][j] === grids[i][j+n]) {
                    streak.hori1++;
                    if(streak.hori1 === l) {
                      streak.hori1 = 0;
                      if(grids[i][j+w]==='') return {i:i, j:j+w};
                    }
                  }
                  else if(j>l && j < size-l-1 && grids[i][j]===arr[k] && n!==w && grids[i][j] === grids[i][j-n]) {
                    streak.hori1++;
                    if(streak.hori1 === l) {
                      streak.hori1 = 0;
                      if(grids[i][j-w]==='') return {i:i, j:j-w};
                    }
                  }
                  if(i>0 && i < size-l-1 && grids[i][j]===arr[k] && n!==w && grids[i][j] === grids[i+n][j]) {
                    streak.verti1++;
                    if(streak.verti1 === l) {
                      streak.verti1=0;
                      if(grids[i+w][j]==='') return {i:i+w, j:j};
                    }
                  }
                  else if(i>l && i < size-l-1 && grids[i][j]===arr[k] && n!==w && grids[i][j] === grids[i-n][j]) {
                    streak.verti1++;
                    if(streak.verti1 === l) {
                      streak.verti1=0;
                      if(grids[i-w][j]==='') return {i:i-w, j:j};
                    }
                  }
                  if(i>0 && j>0 && i < size-l-1 && j < size-l-1 && grids[i][j]===arr[k] && n!==w && grids[i][j] === grids[i+n][j+n]) {
                    streak.diag11++;
                    if(streak.diag11 === l) {
                      streak.diag11=0;
                      if(grids[i+w][j+w]==='') return {i:i+w, j:j+w};
                    }
                  }
                  else if(i>l && j>l && i < size-1 && j < size-1 && grids[i][j]===arr[k] && n!==w && grids[i][j] === grids[i-n][j-n]) {
                    streak.diag11++;
                    if(streak.diag11 === l) {
                      streak.diag11=0;
                      if(grids[i-w][j-w]==='') return {i:i-w, j:j-w};
                    }
                  }
                  if(i > l && j>0 && i < size-1 && j < size-l-1 && grids[i][j]===arr[k] && n!==w && grids[i][j] === grids[i-n][j+n]) {
                    streak.diag21++;
                    if(streak.diag21 === l) {
                      streak.diag21=0;
                      if(grids[i-w][j+w]==='') return {i:i-w, j:j+w};
                    }
                  }
                  else if(i <size-l-1 && j>l && i > 0 && j < size-1 && grids[i][j]===arr[k] && n!==w && grids[i][j] === grids[i+n][j-n]) {
                    streak.diag21++;
                    if(streak.diag21 === l) {
                      streak.diag21=0;
                      if(grids[i+w][j-w]==='') return {i:i+w, j:j-w};
                    }
                  }
                }
              }
              if(l > 1) {
                for(let w = 0; w < 2; w++) {
                  if(j>0 && j<size-l-1 && grids[i][j]===arr[k] && grids[i][j+n-1] === grids[i][j+n]) {
                      if(w===0) {
                        streak.hori++;
                        if(streak.hori === l) {
                          streak.hori = 0;
                          if(grids[i][j+n+1]==='' && grids[i][j-1]==='') return {i:i, j:j+n+1};
                        }
                      }
                      else if(w===1) {
                        streak.newhori++;
                        if(streak.newhori === l) {
                          streak.newhori = 0;
                          if(grids[i][j-1]==='') return {i:i, j:j-1};
                          if(grids[i][j+n+1]==='') return {i:i, j:j+n+1};
                        }
                      }
                  }
                  if(i>0 && i < size-l-1 && grids[i][j]===arr[k] && grids[i+n-1][j] === grids[i+n][j]) {
                      if(w===0) {
                        streak.verti++;
                        if(streak.verti === l) {
                          streak.verti=0;
                          if(grids[i+n+1][j]===''&&grids[i-1][j]==='') return {i:i+n+1, j:j};
                        }
                      }
                      else if(w===1) {
                        streak.newverti++;
                        if(streak.newverti === l) {
                          streak.newverti=0;
                          if(grids[i-1][j]==='') return {i:i-1, j:j};
                          if(grids[i+n+1][j]==='') return {i:i+n+1, j:j};
                        }
                      }
                  }
                  if(i>0 && j>0 && i < size-l-1 && j < size-l-1 && grids[i][j]===arr[k] && grids[i+n-1][j+n-1] === grids[i+n][j+n]) {
                      if(w===0) {
                        streak.diag1++;
                        if(streak.diag1 === l) {
                          streak.diag1=0;
                          if(grids[i+n+1][j+n+1]===''&&grids[i-1][j-1]==='') return {i:i+n+1, j:j+n+1};
                        }
                      }
                      else if(w===1) {
                        streak.newdiag1++;
                        if(streak.newdiag1 === l) {
                          streak.newdiag1=0;
                          if(grids[i-1][j-1]==='') return {i:i-1, j:j-1};
                          if(grids[i+n+1][j+n+1]==='') return {i:i+n+1, j:j+n+1};
                        }
                      }
                  }
                  if(i <size-1 && j>0 && i > l && j < size-l-1 && grids[i][j]===arr[k] && grids[i-n+1][j+n-1] === grids[i-n][j+n]) {
                      if(w===0) {
                        streak.diag2++;
                        if(streak.diag2 === l) {
                          streak.diag2=0;
                          if(grids[i-n-1][j+n+1]===''&&grids[i+1][j-1]==='') return {i:i-n-1, j:j+n+1};
                        }
                      }
                      else if(w===1) {
                        streak.newdiag2++;
                        if(streak.newdiag2 === l) {
                          streak.newdiag2=0;
                          if(grids[i+1][j-1]==='') return {i:i+1, j:j-1};
                          if(grids[i-n-1][j+n+1]==='') return {i:i-n-1, j:j+n+1};
                      }
                    }
                  }
                }
              }
              if(l === 1) {
               if(grids[i][j]===arr[k] && grids[i][j+1]==='' && j<size-1) return {i:i, j:j+1}
               if(grids[i][j]===arr[k] && grids[i][j-1]==='' && j>0) return {i:i, j:j-1}
               if(grids[i][j]===arr[k] && grids[i+1][j]==='' && i<size-1) return {i:i+1, j:j}
               if(grids[i][j]===arr[k] && grids[i-1][j]==='' && i>0) return {i:i-1, j:j}
               if(grids[i][j]===arr[k] && grids[i+1][j+1]==='' && i>0 && j>0) return {i:i+1, j:j+1}
               if(grids[i][j]===arr[k] && grids[i-1][j-1]==='' && i<size-1 && j<size-1) return {i:i-1, j:j-1}
               if(grids[i][j]===arr[k] && grids[i-1][j+1]==='' && i>0 && j<size-1) return {i:i-1, j:j+1}
               if(grids[i][j]===arr[k] && grids[i+1][j-1]==='' && i<size-1 && j>0) return {i:i+1, j:j-1}
              }
            }
          }
        }
      }
    }
      for(let i=0; i<size; i++) {
        for(let j=0; j<size; j++) {
          if(grids[i][j]==='') return {i:i, j:j}
        }
      }
  }
}
