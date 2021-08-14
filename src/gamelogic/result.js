import styles from '../../styles/Game.module.css'
import {useEffect, useRef, useContext} from 'react'
import { RouteContext } from '../contexts/routeContext';

export default function DisplayWinner({passdata}) {
  const {setRoute} = useContext(RouteContext)

  function returnhome() {
    passdata.setWin(null);
    setRoute(obj => {
      const objx = {...obj}
      objx.name = 'lobby'
      return objx
    })
  }

  return (
    <div className={styles.display} >
      <h1>Congrats {passdata.name}! {passdata.win} win!</h1>
      <button onClick={returnhome}>Return</button>
    </div>
  )
}
