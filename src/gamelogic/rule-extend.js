export default function Paint({i, j, size, type}) {
   const arr = []
   let calculateIndex = {
      hori(q) {return (size*i)+j+q},
      verti(q) {return size*(i+q)+j},
      diag1(q) {return size*(i+q)+j+q},
      diag2(q) {return size*(i-q)+j+q}
   }
   for(let q = 0; q < 5; q++) {
      const index = calculateIndex[type](q)
      const pos = {j: index % size}
      pos.i = (index - pos.j) / size
      arr.push(pos)
   }
   return {pos: arr}
}
