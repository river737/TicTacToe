import styles from '../../../styles/lobby/GameCover.module.css'
import {useState} from 'react'
import CreateRoom from '../createroom'

const play = {
  single: "Single Player",
  classic: "Classic",
  existed: "Existing Room",
  multiplayer: "Multiplayer"
}

export default function GameCover({iconClassName, title, description, gameNavClick, action}) {

  const [type, setType] = useState('');

  function transfer() {
    switch(title) {
      case play.single:
        setType(play.single)
        break;
      case play.classic:
        setType(play.classic)
        break;
      case play.existed:
        setType(play.existed)
        break;
      case play.multiplayer:
        setType(play.multiplayer)
        break;
      default:
        break;
    }
  }

  return (
    <>
      <div className={styles.gameCover}>
          <span className={styles.coverDisplay}>
              <i className={iconClassName}/>
          </span>
          <span className={styles.coverTitle}>
              {title}
          </span>
          <span className={styles.coverDescription}>
              {description}
          </span>
          <button className={styles.gameStartBtn} onClick={transfer}>{action.text}</button>
          <button className={`${styles.gameNav} ${styles.left}`} onClick={() => gameNavClick(-1)}>
              <i className="fa fa-chevron-left"/>
          </button>
          <button className={`${styles.gameNav} ${styles.right}`} onClick={() => gameNavClick(1)}>
              <i className="fa fa-chevron-right"/>
          </button>
      </div>
      {
        type !== '' && <CreateRoom {...{setType, type}}/>
      }
    </>
  )
}
