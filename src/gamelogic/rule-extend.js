export default function Paint({i, j, size, wrapper, type}) {
  const color = "blue"
  for(let q = 0; q < 5; q++) {
    switch(type) {
      case 'hori':
         wrapper[size*i+j+q].style.background=color;
         break;
      case 'verti':
         wrapper[size*(i+q)+j].style.background=color;
         break;
      case 'diag1':
         wrapper[size*(i+q)+j+q].style.background=color;
         break;
      case 'diag2':
         wrapper[size*(i-q)+j+q].style.background=color;
         break;
    }
  }
}
