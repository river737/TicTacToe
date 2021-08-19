var move = 0;
let arr = ['o', 'x'];
export default function botmove(x, grids, size, type) {
  const mark = x==='x'?'o':'x';
  if((type === 'hint' && x==='o')||(type !== 'hint' && x==='x')) {
    arr = ['o', 'x'];
  } else if((type === 'hint' && x==='x')||(type !== 'hint' && x==='o')) {
    arr = ['x', 'o'];
  } 
  if(x==='o' && move===0) {
    move++;
    return {i:10, j:10}
  } else {

  for(let g = 1; g < 4; g++) {
    for(let i=0; i<size; i++) {
      for(let j=0; j<size; j++) {
           var l = 4-g;
          for(let k = 0; k < 2; k++) {
            let streak = {
              hori: 0,
              verti: 0,
              diag1: 0,
              diag2: 0
            }
            for(let n=1; n<l+1; n++) {
              if(l > 1) {
                if(j < size-l && grids[i][j]===arr[k] && grids[i][j+n-1] === grids[i][j+n]) {
                  streak.hori++;
                  if(streak.hori === l) {
                    streak.hori = 0;
                    if(grids[i][j+n+1]==='' && j<size-n-1) return {i:i, j:j+n+1};
                    else if(j>0 && grids[i][j-1]==='') return {i:i, j:j-1};
                  }
                } else if(i < size-l && grids[i][j]===arr[k] && grids[i+n-1][j] === grids[i+n][j]) {
                  streak.verti++;
                  if(streak.verti === l) {
                    streak.verti=0;
                    if(grids[i+n+1][j]==='' && i<size-n-1) return {i:i+n+1, j:j};
                    else if(i>0 && grids[i-1][j]==='') return {i:i-1, j:j};
                  }
                }  else if(i < size-l && j <= size-l && grids[i][j]===arr[k] && grids[i+n-1][j+n-1] === grids[i+n][j+n]) {
                  streak.diag1++;
                  if(streak.diag1 === l) {
                    streak.diag1=0;
                    if(grids[i+n+1][j+n+1]==='' && j<size-n-1 && i <size-n-1) return {i:i+n+1, j:j+n+1};
                    else if(i>0 && j>0 && grids[i-1][j-1]==='') return {i:i-1, j:j-1};
                  }
                } else if(i >= l && j < size-l && grids[i][j]===arr[k] && grids[i-n+1][j+n-1] === grids[i-n][j+n]) {
                  streak.diag2++;
                  if(streak.diag2 === l) {
                    streak.diag2=0;
                    if(grids[i-n-1][j+n+1]==='' && i>n && j<size-n-1) return {i:i-n-1, j:j+n+1};
                    else if(i <size-1 && j>0 && grids[i+1][j-1]==='') return {i:i+1, j:j-1};
                  }
                }
              } else if(l === 1) {
                 if(grids[i][j]===arr[k]) {
                   if(grids[i][j+1]==='' && j<size-1) return {i:i, j:j+1}
                   if(grids[i][j-1]==='' && j>0) return {i:i, j:j-1}

                   if(grids[i+1][j]==='' && i<size-1) return {i:i+1, j:j}
                   if(grids[i-1][j]==='' && i>0) return {i:i-1, j:j}

                   if(grids[i+1][j+1]==='' && i>0 && j>0) return {i:i+1, j:j+1}
                   if(grids[i-1][j-1]==='' && i<size-1 && j<size-1) return {i:i-1, j:j-1}

                   if(grids[i-1][j+1]==='' && i>0 && j<size-1) return {i:i-1, j:j+1}
                   if(grids[i+1][j-1]==='' && i<size-1 && j>0) return {i:i+1, j:j-1}
                 }
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
