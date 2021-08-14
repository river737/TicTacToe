import {useState, useEffect, useContext, useReducer, useRef} from 'react'

import {InfoContext} from '../../contexts/infoContext.js'
import { RouteContext } from '../../contexts/routeContext.js'

import styles from '../../../styles/Game.module.css'

import detector from '../../gamelogic/rule.js'
import DisplayWinner from '../../gamelogic/result.js'

function reducer(newarr, action) {
  switch(action.type) {
    case 'add':
      newarr[action.append.i][action.append.j].fill = action.symbol;
      return [...newarr];
    default:
       return [...newarr];
  }
}

export default function Game() {
  const {setRoute} = useContext(RouteContext)
  const {data, setData} = useContext(InfoContext);

  const [turn, setTurn] = useState('x');
  const [winner, setWinner] = useState(null);

  const gridwrapper = useRef();

  const size = 15
  let arr = [];
  for(let i = 0; i < size; i++) {
    arr[i] = new Array();
    for(let j = 0; j < size; j++) {
      arr[i][j] = {fill: ''};
    }
  }

  const [newarr, dispatch] = useReducer(reducer, arr);

  function display(i, j) {
    if(newarr[i][j].fill==='') {
      dispatch({type:'add', append:{i: i, j: j}, symbol:turn});
      setTurn(turn==='o' ? 'x':'o');
    }
  }

  function back() {
    setRoute({name: 'game'})
  }

  // useEffect(() => {
  //   if(!data.gameIsSet) {
  //     setRoute({name: 'lobby'})
  //   }
  // }, [data.gameIsSet, setRoute])

  useEffect(()=>{
    const x = detector(newarr, size, gridwrapper.current.childNodes);
    if(x.win !== null) setTimeout(() => setWinner(x.win), 1000);
  }, [newarr]);

  return (
    <div className={styles.gameContainer}>
      <div className={styles.grid}>
        <div className={styles.box} ref={gridwrapper}>
        {
          newarr.map((items, i) => {
            return items.map((item, j) => {
              return <div className={styles.grids} key={i*size+j} onClick={() => display(i, j)}>{item.fill}</div>
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
          <div className={styles.sidebarBody}>
            <button onClick={back} className={styles.button}>Terminate game</button>
          </div>
        </div>
        
      </div>
      {(winner!==null) && <DisplayWinner passdata={{name: data.name, win: winner, setWin: setWinner}} />}
    </div>
  )
}
