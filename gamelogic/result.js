import styles from '../styles/Game.module.css'
import {useRouter} from 'next/router'
import {useEffect} from 'react'

export default function DisplayWinner({passdata, win}) {
  const router = useRouter();

  function returnhome() {
    passdata.playerType='joiner';
    passdata.createGridLength = 0;
    passdata.winQuant = 0;
    passdata.winner = 0;
    const x = document.querySelector(`.${styles.display}`)
    x.style.zIndex="-10";
    x.style.opacity="0";
    router.push('/');
  }

  useEffect(() => {
    if(win||win===false) {
      const x = document.querySelector(`.${styles.display}`)
      x.style.zIndex="10";
      x.style.opacity="1";
    }
  }, [win])
  return (
    <div className={styles.display}>
       {win && <h1>Congrats {passdata.name}! You win!</h1>}
       {(win===false) && <h1>Nice try {passdata.name}! What about another game?</h1>}
       <button onClick={() => returnhome()}>Return</button>
    </div>
  )
}
