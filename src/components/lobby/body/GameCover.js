import styles from '../../../../styles/lobby/GameCover.module.css'
import {useState} from 'react'
import CreateRoom from '../../createroom'

export default function GameCover({iconClassName, title, description, gameNavClick, action}) {

  const [type, setType] = useState('');

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
          <button className={styles.gameStartBtn} onClick={()=> setType(title)}>{action.text}</button>
          <button className={`${styles.gameNav} ${styles.left}`} onClick={() => gameNavClick(-1)}>
              <i className="fa fa-chevron-left"/>
          </button>
          <button className={`${styles.gameNav} ${styles.right}`} onClick={() => gameNavClick(1)}>
              <i className="fa fa-chevron-right"/>
          </button>
      </div>
      {
        type !== '' && <CreateRoom {...{setType, type: title}}/>
      }
    </>
  )
}
