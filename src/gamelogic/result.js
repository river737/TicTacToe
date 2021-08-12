import styles from '../../styles/Game.module.css'
import {useRouter} from 'next/router'
import {useEffect, useRef} from 'react'

export default function DisplayWinner({passdata}) {
  const router = useRouter();

  function returnhome() {
    passdata.setWin(null);
    router.push('/');
  }

  return (
    <div className={styles.display} >
      <h1>Congrats {passdata.name}! {passdata.win} win!</h1>
      <button onClick={returnhome}>Return</button>
    </div>
  )
}
