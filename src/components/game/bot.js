import {useState, useEffect, useReducer, useRef} from 'react'

import styles from '../../../styles/Game.module.css'

import Game from './game'

import botmove from '../../gamelogic/botmove'
import Choose from '../Choose/choose'
import Difficulty from '../Difficulty/difficulty'

function reducer(grids, action) {
  switch(action.type) {
    case 'add':
      const {i, j} = action.append
      const arr = grids.map(row => [...row]) // deep copy the "grids" array to prevent unexpected bugs
      arr[i][j] = action.symbol
      return arr
    default:
       return grids;
  }
}

/* 
  Grid wrapper is not gonna work here
*/

export default function Bot({setPage}) {
  const [symb, thissymb] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [myturn, setMyturn] = useState(true);
  const [prevbot, setPrevbot] = useState(undefined);
  const [prevplayer, setPrevplayer] = useState(undefined);

  const gridwrapper = useRef();

  const size = 20
  let arr = new Array(size).fill(new Array(size).fill(''));

  const [grids, dispatch] = useReducer(reducer, arr);

  function display(i, j) {
    
    if(grids[i][j]==='' && myturn) {
      setMyturn(false)
      dispatch({type:'add', append: {i, j}, symbol: symb});
      setPrevplayer({i, j});
      return
    }
  }
  

  useEffect(()=>{
    if(!myturn) {
      const {i, j} = botmove(symb, grids, size, 'move');
      dispatch({type:'add', append: {i, j}, symbol: symb==='o'?'x':'o'});
      setMyturn(true);
      setPrevbot({i, j});
    }

  }, [grids, symb]);
  const sidebar = <Sidebar {...{grids, symb, setPage, botmove, gridwrapper, prevbot, size, prevplayer}}/>
  return (
    <>
      {
        difficulty==='' ?
          <Difficulty {...{setDifficulty}} />
        : symb!=='' ?
          <Game {...{size, grids, display, sidebar, type: 'bot', ref: gridwrapper}}/>
        :
          <Choose {...{thissymb}} />
      }
    </>
  )
}

function Sidebar({grids, symb, setPage, botmove, gridwrapper, prevbot, size, prevplayer}) {
  function showhint() {
    const a = botmove(symb, grids, size, 'hint');
    const classToggle = ()=>{
      gridwrapper.current.childNodes[a.i*size+a.j].classList.toggle(styles.hint)
    }
    classToggle()
    setTimeout(classToggle, 1000);
  }

  function lastmove() {
    const classToggle = () => {
      gridwrapper.current.childNodes[prevbot.i*size+prevbot.j].classList.toggle(styles.lastmove)
    }
    classToggle()
    setTimeout(classToggle, 1000);
  }

  function undo() {
    if(prevbot!==undefined && prevplayer!==undefined) {
      dispatch({type:'add', append: {i:prevbot.i, j:prevbot.j}, symbol: ''});
      dispatch({type:'add', append: {i:prevplayer.i, j:prevplayer.j}, symbol: ''});
    }
  }

  function back() {
    setPage({opened: false})
  }
  return (
    <div>
      <button onClick={showhint} className={styles.button}>Show hint</button>
      <button onClick={lastmove} className={styles.button}>Show last move</button>
      <button onClick={undo} className={styles.button}>Undo move</button>
      <button onClick={back} className={styles.button}>Terminate game</button>
    </div>
  )
}
