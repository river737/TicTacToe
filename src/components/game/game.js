import {useEffect, useContext, forwardRef} from 'react'

import {InfoContext} from '../../contexts/infoContext.js'

import styles from '../../../styles/game/Game.module.css'

import detector from '../../gamelogic/rule.js'
import DisplayWinner from '../../gamelogic/result.js'

const Game = forwardRef(({winner, setWinner, lastMove={}, clicks=0, size= 20, display, sidebar, grids, type="multiplayer" || "bot"}, ref) => {
  const {data} = useContext(InfoContext);

  useEffect(()=>{
    if(clicks>0) {
      ref?.current?.parentNode?.previousElementSibling?.play()
    }
    const x = detector(grids, size);
    
    if(x) {
      setWinner(x)
    }
  }, [setWinner, grids]);

  return (
    <div className={styles.gameContainer}>
      <audio>
        <source src="https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-61905/zapsplat_multimedia_button_click_004_68776.mp3"/>
      </audio>
      <div className={styles.grid}>
        <div className={styles.box} ref={ref} style={{'--column': size}}>
          {
            grids.map((items, i) => {
              return items.map((mark, j) => {
                const attr = {
                  onClick() {display(i, j)}
                }
                if(winner) {
                  if(winner.pos.filter(val => val.i === i && val.j === j).length > 0) {
                    attr.className = styles.winGrid
                  }
                }
                return <div key={`${i}-${j}`} {...attr}>{mark}</div>
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
      {
        type==='bot' && winner!==null ? <DisplayWinner {...{username: data.name, winner}} /> : ''
      }
    </div>
  )
})
Game.displayName = "Game"

export default Game
