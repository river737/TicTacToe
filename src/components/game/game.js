import {useState, useEffect, useContext, forwardRef} from 'react'

import {InfoContext} from '../../contexts/infoContext.js'

import styles from '../../../styles/Game.module.css'

import detector from '../../gamelogic/rule.js'
import DisplayWinner from '../../gamelogic/result.js'

const Game = forwardRef(({size= 20, display, sidebar, grids, type="multiplayer" || "bot"}, ref) => {
  const {data} = useContext(InfoContext);
  
  const [winner, setWinner] = useState(null);

  useEffect(()=>{
    const audio = ref?.current?.parentNode?.previousElementSibling
    audio?.play()
    console.log(audio)
    const x = detector(grids, size, ref?.current?.childNodes);
    if(x.win !== null) setTimeout(() => setWinner(x.win), 1000);
  }, [grids]);

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
})
Game.displayName = "Game"

export default Game
