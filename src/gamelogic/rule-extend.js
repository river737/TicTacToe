import styles from '../../styles/Game.module.css'

export default function Paint(i, j, grid, size, wrapper, type) {
  const color = "blue"
  for(let q = 0; q < 5; q++) {
    switch(type) {
      case 'hori':
         wrapper[size*i+j+q].style.background=color;
         break;
      case 'verti':
         grid[i+q][j].color=color;
         wrapper[size*(i+q)+j].style.background=color;
         break;
      case 'diag1':
         grid[i+q][j+q].color=color;
         wrapper[size*(i+q)+j+q].style.background=color;
         break;
      case 'diag2':
         grid[i-q][j+q].color=color;
         wrapper[size*(i-q)+j+q].style.background=color;
         break;
    }
  }
}
