import {useEffect, useContext, forwardRef, useState} from 'react'

import {InfoContext} from '../../contexts/infoContext.js'

import styles from '../../../styles/game/Game.module.css'

import detector from '../../gamelogic/rule.js'
import DisplayWinner from '../../gamelogic/result.js'

const Game = forwardRef(({winner, setWinner, lastMove={}, clicks=0, size= 20, display, sidebar, grids, type="multiplayer" || "bot", symb, botturn, setBotturn}, ref) => {
  const {data} = useContext(InfoContext);
  const [displaywinner, setdisplaywinner] = useState(null);
  const [focus, setFocus] = useState({}) // {pos: {i: 0, j: 0}}

  const keydown = (e) => {
    let {code: c} = e
    if(c.includes('Arrow')) {
      c = c.replace('Arrow', '')

      const {i, j} = focus.pos

      if((c==='Left' && j === 0) || (c==='Right' && j===size)) return

      const num = {Left: -1, Right: 1, Down: size, Up: -size}

      if(num[c]) {
        e.preventDefault()
        ref?.current?.children[i*size + j + num[c]]?.focus()
      }
    }
  }

  useEffect(()=>{
    if(clicks>0) {
      ref?.current?.parentNode?.previousElementSibling?.play()
    }
    const x = detector(grids, size);

    if(x) {
      botturn.check = false;
      setBotturn(botturn);
      setWinner(x)
      setTimeout(()=>setdisplaywinner(true),800);
    } else {
      botturn.check = true;
      setBotturn(botturn);
    }
  }, [setWinner, grids]);

  return (
    <div className={styles.gameContainer}>
      <audio>
        <source src="https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-61905/zapsplat_multimedia_button_click_004_68776.mp3"/>
      </audio>
      <div className={styles.grid}>
        <div className={styles.box} ref={ref} style={{'--column': size}} onKeyDown={keydown}>
          {
            grids.map((items, i) => {
              return items.map((mark, j) => {
                const classList = []
                const attr = {
                  onFocus(e) {
                    setFocus({pos: {i, j}, mark})
                  },
                  onBlur(e) {
                    if(!ref?.current?.contains(e.relatedTarget)) { // loses focus to node outside of the game grid
                      setFocus({})
                    }
                  }
                }

                if(mark==='') attr.onClick = (e) => {
                  const {mark: markX} = display(i, j)
                  if(markX) {
                    setFocus({pos: {i, j}, mark: markX})
                  }
                }

                if(winner) {
                  if(winner.pos.filter(val => val.i === i && val.j === j).length > 0) {
                    classList.push(styles.winGrid)
                  }
                }

                if(focus?.mark!=='' && focus?.mark === mark) classList.push(styles.markHighlight)


                if(classList.length > 0) attr.className = classList.join(' ')
                return <button key={`${i}-${j}`} {...attr}>{mark}</button>
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
        type!=='' && displaywinner!==null ? <DisplayWinner {...{username: data.name, winner, type, symb}} /> : ''
      }
    </div>
  )
})
Game.displayName = "Game"

export default Game
