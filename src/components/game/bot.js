import {useState, useEffect, useContext, useReducer, useRef} from 'react'

import {InfoContext} from '../../contexts/infoContext.js'

import styles from '../../../styles/Game.module.css'

import detector from '../../gamelogic/rule.js'
import DisplayWinner from '../../gamelogic/result.js'
import botmove from '../../gamelogic/botmove'
import Choose from '../Choose/choose'
import Difficulty from '../Difficulty/difficulty'

function reducer(grids, action) {
  switch(action.type) {
    case 'add':
      grids[action.append.i][action.append.j] = action.symbol;
      return [...grids];
    default:
       return [...grids];
  }
}

export default function Game() {
  const {data} = useContext(InfoContext);
  const [symb, thissymb] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [myturn, setMyturn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [prevbot, setPrevbot] = useState(undefined);
  const [prevplayer, setPrevplayer] = useState(undefined);

  const gridwrapper = useRef();

  const size = 20
  let arr = [];
  for(let i = 0; i < size; i++) {
    arr[i] = new Array();
    for(let j = 0; j < size; j++) {
      arr[i][j] = '';
    }
  }

  const [grids, dispatch] = useReducer(reducer, arr);

  function display(i, j) {
    if(grids[i][j]==='' && myturn) {
      setMyturn(false);
      dispatch({type:'add', append: {i, j}, symbol: symb});
      setPrevplayer({i:i,j:j});
    }
  }

  useEffect(() => {
    if(symb==='o') {
      const x = botmove(symb, grids, size);
      dispatch({type:'add', append: {i:x.i, j:x.j}, symbol: symb==='o'?'x':'o'});
    }
  }, [symb])

  function showhint() {
    var a = botmove(symb, grids, size, 'hint');
    gridwrapper.current.childNodes[a.i*size+a.j].className=styles.hint;
    setTimeout(() => {
      gridwrapper.current.childNodes[a.i*size+a.j].className='';
    }, 1000);
  }

  function lastmove() {
    gridwrapper.current.childNodes[prevbot.i*size+prevbot.j].className=styles.lastmove;
    setTimeout(() => {
      gridwrapper.current.childNodes[prevbot.i*size+prevbot.j].className='';
    }, 1000);
  }

  function undo() {
    if(prevbot!==undefined && prevplayer!==undefined) {
      dispatch({type:'add', append: {i:prevbot.i, j:prevbot.j}, symbol: ''});
      dispatch({type:'add', append: {i:prevplayer.i, j:prevplayer.j}, symbol: ''});
    }
  }

  function back() {

  }

  useEffect(()=>{
    if(symb!=='') {
      const x = detector(grids, size, gridwrapper.current.childNodes);
      if(x.win !== null) setTimeout(() => setWinner(x.win), 1000);
    }

    if(!myturn) {
      var a = botmove(symb, grids, size, 'move');
      dispatch({type:'add', append: {i:a.i, j:a.j}, symbol: symb==='o'?'x':'o'});
      setMyturn(true);
      setPrevbot({i:a.i, j:a.j});
    }

  }, [grids, symb]);

  return (
    <>
    {difficulty==='' ?
      <Difficulty {...{setDifficulty}} />
      : symb!=='' ?
      <div className={styles.gameContainer}>
        <div className={styles.grid}>
          <div className={styles.box} ref={gridwrapper} style={{'--column': size}}>
          {
            grids.map((items, i) => {
              return items.map((mark, j) => {
                return <div key={`${i}-${j}`} onClick={() => display(i, j)}>{mark}</div>
              })
            }
            )
          }
          </div>

        </div>
        <div className={styles.sidebar}>
          <div>
            <div className={styles.sidebarTop}>
              <div></div>
            </div>
            <div className={styles.sideway}>
              <button onClick={showhint} className={styles.button}>Show hint</button>
              <button onClick={lastmove} className={styles.button}>Show last move</button>
              <button onClick={undo} className={styles.button}>Undo move</button>
              <button onClick={back} className={styles.button}>Terminate game</button>
            </div>
          </div>

        </div>
        {(winner!==null) && <DisplayWinner passdata={{name: data.name, win: winner, setWin: setWinner, type:'bot'}} />}
      </div> :
      <Choose {...{thissymb}} />}
  </>
  )
}
