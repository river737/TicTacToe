import {useState, useEffect, useContext, useReducer, useRef} from 'react'

import {InfoContext} from '../../contexts/infoContext.js'
import { SocketContext } from '../../contexts/socketContext.js'

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

export default function Game({setPage, room, type}) {
  const {socket} = useContext(SocketContext)
  const {data} = useContext(InfoContext);

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

  const myIndex = type === 'create' ? 0 : 1
  function display(i=0, j=0) {
    const isMyTurn = room.players[myIndex].mark === turn
    if(newarr[i][j].fill==='' && isMyTurn) {
      socket.emit('place_mark', {room: room.id, mark: turn, pos: {i, j}})
    }
  }

  function displayX({i=0, j=0, mark=''}) {
    dispatch({type:'add', append: {i, j}, symbol: mark});
    setTurn(turn => turn==='o' ? 'x' : 'o');
  }

  function back() {
    setPage({opened: false})
  }

  useEffect(()=>{
    const x = detector(newarr, size, gridwrapper.current.childNodes);
    if(x.win !== null) setTimeout(() => setWinner(x.win), 1000);
  }, [newarr]);

  useEffect(()=>{
    socket.on('place_mark_response', (res) => {
      if(res.success) {
        const {i, j} = res.pos
        displayX({i, j, mark: res.mark})
      }
    })
    return () => {
      socket.off('place_mark_response')
    }
  }, [dispatch])

  useEffect(()=>{
    socket.emit('game_phase', {room: room.id})
  }, [])

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
