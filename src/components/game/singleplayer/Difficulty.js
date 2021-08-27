import styles from '../../../../styles/mode/mode.module.css'
export default function Difficulty({setDifficulty}) {
  return (
    <div className={styles.mode}>
      <h1>Pick a mode</h1>
      <button onClick={()=>setDifficulty('easy')}>Easy</button>
      <button onClick={()=>setDifficulty('medium')}>Medium</button>
      <button onClick={()=>setDifficulty('hard')}>Hard</button>
    </div>
  )
}
