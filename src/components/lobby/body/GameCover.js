import styles from '../../../../styles/lobby/GameCover.module.css'

export default function GameCover({iconClassName, title, description, gameNavClick, action}) {

  // const actionAttr = {}
  // if(action.click) actionAttr.onClick = action.click
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

          <button className={styles.gameStartBtn} onClick={() => {if(action.click) action.click()} }>{action.text}</button>

          <button className={`${styles.gameNav} ${styles.left}`} onClick={() => gameNavClick(-1)}>
              <i className="fa fa-chevron-left"/>
          </button>
          <button className={`${styles.gameNav} ${styles.right}`} onClick={() => gameNavClick(1)}>
              <i className="fa fa-chevron-right"/>
          </button>
      </div>
    </>
  )
}
