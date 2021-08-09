export default function Paint(i, j, grid, win_quant, type) {
  const color = 'lightblue';
  for(let q = 0; q < win_quant; q++) {
    switch(type) {
      case 'hori':
         grid[i][j+q].style.background=color;
         break;
      case 'verti':
         grid[i+q][j].style.background=color;
         break;
      case 'diag1':
         grid[i+q][j+q].style.background=color;
         break;
      case 'diag2':
         grid[i-q][j+q].style.background=color;
         break;
    }
  }
}
