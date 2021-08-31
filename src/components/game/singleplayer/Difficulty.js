import styles from '../../../../styles/mode/mode.module.css'
export default function Difficulty({setDifficulty}) {
  return (
    <div className={styles.mode}>
      <div className={styles.box1}>
        <h1>Difficulty: Easy</h1>
        <i className="fa fa-crown fa-2x"></i>
        <button onClick={()=>setDifficulty('easy')}>Play</button>
        <h3>If you are new to Tic Tac Toe, you should definitely play this mode</h3>
      </div>
      <div className={styles.box2}>
        <h1>Difficulty: Medium</h1>
        <i className="fa fa-crown fa-2x"></i>
        <i className="fa fa-crown fa-2x"></i>
        <h3>If you have played Tic Tac Toe before, you should try playing this mode</h3>
        <button onClick={()=>setDifficulty('medium')}>Play</button>
      </div>
      <div className={styles.box3}>
        <h1>Difficulty: Hard</h1>
        <i className="fa fa-crown fa-2x"></i>
        <i className="fa fa-crown fa-2x"></i>
        <i className="fa fa-crown fa-2x"></i>
        <h3>If you have mastered Tic Tac Toe, this will be a challenge for you!</h3>
        <button onClick={()=>setDifficulty('hard')}>Play</button>
      </div>
    </div>
  )
}
