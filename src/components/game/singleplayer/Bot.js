import {useState, useEffect, useReducer, useRef} from 'react'

import Game from '../game'

import botmove from '../../../gamelogic/botmove'
import Choose from './Choose'
import Difficulty from './Difficulty'
import Sidebar from './Sidebar'

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

export default function Bot({setPage}) {
  const [symb, thissymb] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [myturn, setMyturn] = useState(true);
  const [prevbot, setPrevbot] = useState(undefined);
  const [prevplayer, setPrevplayer] = useState(undefined);
  const [winner, setWinner] = useState(null)

  const gridwrapper = useRef();

  const size = 20
  let arr = new Array(size).fill(new Array(size).fill(''));

  const [grids, dispatch] = useReducer(reducer, arr);

  function display(i, j) {
    if(grids[i][j]==='' && myturn) {
      setMyturn(false)
      dispatch({type:'add', append: {i, j}, symbol: symb});
      setPrevplayer({i, j});
      return {mark: symb}
    }
  }


  useEffect(()=>{
    if(!myturn && !winner) {
      setTimeout(() => {
        setMyturn(true);
        const {i, j} = botmove(symb, grids, size, 'move', difficulty);
        dispatch({type:'add', append: {i, j}, symbol: symb==='o'?'x':'o'});
        setPrevbot({i, j});
     }, 500);
    }
  }, [grids, symb]);
  const sidebar = <Sidebar {...{grids, symb, setPage, botmove, gridwrapper, prevbot, size, prevplayer, dispatch}}/>
  return (
    <>
      {
        difficulty==='' ?
          <Difficulty {...{setDifficulty}} />
        : symb!=='' ?
          <Game {...{size, grids, display, sidebar, type: 'bot', ref: gridwrapper, winner, setWinner}}/>
        :
          <Choose {...{thissymb}} />
      }
    </>
  )
}
