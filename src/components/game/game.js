import {useState, useEffect, useContext, useRef} from 'react'

import {InfoContext} from '../../contexts/infoContext.js'

import styles from '../../../styles/Game.module.css'

import detector from '../../gamelogic/rule.js'
import DisplayWinner from '../../gamelogic/result.js'

export default function Game({display, sidebar, grids, type="multiplayer" || "bot"}) {
  const size = 20

  const {data} = useContext(InfoContext);
  
  const [winner, setWinner] = useState(null);

  const gridwrapper = useRef();

  useEffect(()=>{
    const x = detector(grids, size, gridwrapper.current.childNodes);
    if(x.win !== null) setTimeout(() => setWinner(x.win), 1000);
  }, [grids]);

  return (
    <div className={styles.gameContainer}>
      <div className={styles.grid}>
        <div className={styles.box} ref={gridwrapper} style={{'--column': size}}>
          {
            grids.map((items, i) => {
              return items.map((mark, j) => {
                return <div key={`${i}-${j}`} onClick={() => display(i, j)}>{mark}</div>
              })
            })
          }
        </div>

      </div>
      <div className={styles.sidebar}>
        <div>
          {sidebar}
        </div>

      </div>
      {(winner!==null) && <DisplayWinner passdata={{name: data.name, win: winner, setWin: setWinner, type}} />}
    </div>
  )
}
