import {useState, useEffect, useReducer, useRef} from 'react'

import Game from '../game'

import Alert from './Alert.js'
import botmove from '../../../gamelogic/botmove'
import Choose from './Choose'
import Difficulty from './Difficulty'
import Sidebar from './Sidebar'

const size = 20;

function reducer(grids, action) {
  switch(action.type) {
    case 'add':
      const {i, j} = action.append
      const arr = grids.map(row => [...row]) // deep copy the "grids" array to prevent unexpected bugs
      arr[i][j] = action.symbol
      return arr;
    case 'restart':
      for(let i = 0; i < size; i++) {
        for(let j = 0; j < size; j++) {
          grids[i][j] = '';
        }
      }
      return grids;
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
  const [winner, setWinner] = useState(null);
  const [firstmove, setFirstmove] = useState(0);
  const [restartgame, setRestartgame] = useState({restart: false, alert: false});
  const [botturn, setBotturn] = useState({turn: false, check: false});

  const gridwrapper = useRef();

  let arr = new Array(size).fill(new Array(size).fill(''));

  const [grids, dispatch] = useReducer(reducer, arr);

  function display(i, j) {
    if(grids[i][j]==='' && myturn) {
      setMyturn(false);
      setFirstmove(move => {
        if(!move) {
          move = 1;
        }
        return move;
      })
      dispatch({type:'add', append: {i, j}, symbol: symb});
      setPrevplayer({i, j});
      botturn.turn = true;
      setBotturn(botturn);
      return {mark: symb};
    }
  }


  useEffect(()=>{
    if(!myturn && botturn.turn && botturn.check) {
      botmark(firstmove);
    }
    if(restartgame.restart) {
      dispatch({type:'restart', append: '', symbol: ''});
      setRestartgame({restart: false, alert: false});
      if(symb==="o") {
        botmark(0);
      }
    }
  }, [grids, symb, restartgame]);

  function botmark(x) {
    setTimeout(() => {
      setMyturn(true);
      setBotturn({turn: false, check: false});
      const {i, j} = botmove(symb, grids, size, 'move', difficulty, x);
      dispatch({type:'add', append: {i, j}, symbol: symb==='o'?'x':'o'});
      setPrevbot({i, j});
    }, 500);
  }


  const sidebar = <Sidebar {...{grids, symb, setPage, botmove, gridwrapper, prevbot, size, prevplayer, dispatch, setFirstmove, setRestartgame}}/>
  return (
    <>
      {
        difficulty==='' ?
          <Difficulty {...{setDifficulty}} />
        : symb!=='' ?
          <Game {...{size, grids, display, sidebar, type: 'bot', ref: gridwrapper, winner, setWinner, symb, botturn, setBotturn}}/>
        :
          <Choose {...{thissymb, setMyturn, setBotturn}}/>
      }
      {
        restartgame.alert && <Alert {...{setRestartgame}} />
      }
    </>
  )
}
