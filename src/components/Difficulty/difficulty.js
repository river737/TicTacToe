import styles from '../../../styles/mode/mode.module.css'
export default function Difficulty({setDifficulty}) {

  function easy() {
    setDifficulty('easy');
  }

  function medium() {
    setDifficulty('medium');
  }

  function hard() {
    setDifficulty('hard');
  }

  return (
    <div className={styles.mode}>
      <h1>Pick a mode</h1>
      <button onClick={easy}>Easy</button>
      <button onClick={medium}>Unavailable</button>
      <button onClick={hard}>Unavailable</button>
    </div>
  )
}
