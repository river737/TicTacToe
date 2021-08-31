import styles from '../../../../styles/game/singleplayer/Alert.module.css'

export default function Alert({setRestartgame}) {
  function accept() {
    setRestartgame({restart: true, alert: false});
  }

  function decline() {
    setRestartgame({restart: false, alert: false});
  }

  return (
    <div className={styles.container}>
      <h3>Are you sure you want to restart?</h3>
      <div>
        <button onClick={accept}>Yes</button>
        <button onClick={decline}>No</button>
      </div>
    </div>
  )
}
