import styles from '../styles/Create.module.css'
import {useState, useEffect, useContext} from 'react'
import {useRouter} from 'next/router'
import {InfoContext} from '../src/contexts/infoContext'

export default function CreateRoom() {

  const router = useRouter();
  const data = useContext(InfoContext);
  const [length, setLength] = useState(null);
  const [winQuant, setWinQuant] = useState(null);
  const [error, setError] = useState({error: false, submitted: false});

  function gridlength(val) {
    setLength(parseFloat(val));
  }

  function quant(val) {
    setWinQuant(parseFloat(val))
  }

  function submit(val) {
    if(Number.isInteger(length) && length > 0 && length < 14 && Number.isInteger(winQuant) && winQuant > 0 && winQuant <= length) {
      data.createGridLength = length;
      data.winQuant = winQuant;
      setError({error: false, submitted: true});
    } else {
      setError({error: true, submitted: false});
    }
  }

  useEffect(() => {
    if(!error.error && error.submitted) {
      const x = document.querySelector(`.${styles.content}`);
      const y = document.querySelector(`.${styles.background}`);
      x.parentNode.removeChild(x);
      y.parentNode.removeChild(y);
      router.push('/game');
    }
  }, [error.submitted])

  return (
    <>
    <div className={styles.content}>

      <div className={styles.wrap}>
        <h2>Grid's length</h2>
        <input className={styles.input} type="text" onChange={(e) => gridlength(e.target.value)} />
      </div>

      <h2>Note: the actual grid's size will square the grid's length.</h2>

      <div className={styles.wrap}>
        <h2>Quantity in a row to win</h2>
        <input className={styles.input} type="text" onChange={(e) => quant(e.target.value)} />
      </div>

      <button className={styles.button} onClick={() => submit()}>Confirm</button>

      {error.error && <h2>Ooops! Make sure they are numbers and "Quantity in a row to win" cannot exceed "Grid's length"</h2>}

    </div>

    <div className={styles.background}>
    </div>
    </>
  )
}
