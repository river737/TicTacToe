import styles from '../../../styles/lobby/GameCover.module.css'
import {useRouter} from 'next/router'
import {useState} from 'react'
import CreateRoom from '../createroom'

const play = {
  single: "Single Player",
  classic: "Classic",
  existed: "Existing Room",
  multiplayer: "Multiplayer"
}

export default function GameCover({iconClassName, title, description, gameNavClick, action}) {

  const router = useRouter();
  const [type, setType] = useState('');

  function transfer() {
    switch(title) {
      case play.single:
        return setType(play.single)
        break;
      case play.classic:
        return setType(play.classic)
        break;
      case play.existed:
        return setType(play.existed)
        break;
      case play.multiplayer:
        return setType(play.multiplayer)
        break;
      default:
        return '';
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
          type !== '' && <CreateRoom type={type}/>
        }
      </>
    )
}
