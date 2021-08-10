import styles from '../../styles/Game.module.css'
import {InfoContext} from '../contexts/infoContext'
import {useRouter} from 'next/router'
import {useState, useEffect, useContext} from 'react'
import detector from '../../gamelogic/rule.js'
import DisplayWinner from '../../gamelogic/result.js'

export default function Game() {
  const data = useContext(InfoContext);
  const router = useRouter();
  var grid_size = 0, size = 50, win_quant = 0;
  let grid = [], newgrid = [];
  ////////////the host will begin first as x////////////////
  var turn = 'myturn';
  const [winner, setWinner] = useState(null);
  const [newdata, setNewdata] = useState({...data});


  // testing purpose, will be removed later
  function clear() {
    for(let i = 0; i < grid_size; i++) {
      for(let j = 0; j < grid_size; j++) {
        grid[i][j].innerHTML = '';
        newgrid[i][j] = '';
      }
    }
  }

  function startgame() {
    for(let i = 0; i < grid_size; i++) {
      for(let j = 0; j < grid_size; j++) {
        grid[i][j].onclick = function() {
          if(grid[i][j].innerHTML === '') {
            grid[i][j].innerHTML = (turn === 'myturn' ? 'x' : 'o');
            newgrid[i][j] = (turn === 'myturn' ? 'x' : 'o');
            let x = detector(grid_size, win_quant, grid, newgrid);
            turn = (turn === 'myturn' ? 'theirturn' : 'myturn');
            if(x.win||x.win===false) {
              data.winner = x.win;
              setWinner(data.winner);
            }
          }
        }
      }
    }
  }

  useEffect(()=>{
    data.playerType = newdata.playerType;
    data.createGridLength = newdata.createGridLength;
    data.winQuant = newdata.winQuant;
    data.winner = newdata.winner;
    console.log(data)
  }, [newdata])

  useEffect(()=>{
    if(data.name === '') router.push('/');
    else {
      const displayGrid = document.querySelector(`.${styles.grid}`);
      grid_size = data.createGridLength;
      win_quant = data.winQuant;
      for(let i = 0; i < grid_size; i++) {
        grid[i] = new Array();
        newgrid[i] = new Array();
        for(let j = 0; j < grid_size; j++) {
          newgrid[i][j] = new Array('');
          grid[i][j] = document.createElement('div');
          grid[i][j].className=styles.grids;
          grid[i][j].style.top = size*i+"px";
          grid[i][j].style.left = size*j+"px";
          grid[i][j].innerHTML = '';
          displayGrid.appendChild(grid[i][j]);
        }
      }
      displayGrid.style.top = `calc(50% - ${(grid_size*25-40)}px)`;
      displayGrid.style.left = `calc(50% - ${grid_size*25}px)`;
    }
  }, [data.createGridLength]);
  return (
    <>
      <button className={styles.clear} onClick={()=>clear()}>clear</button>
      <div className={styles.grid} onClick={() => startgame()}>
      </div>
      {(winner||winner===false) && <DisplayWinner passdata={newdata} win={winner}/>}
    </>
  )
}
