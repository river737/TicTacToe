import styles from '../../styles/game/singleplayer/Display.module.css'
import {useContext} from 'react'

import { PageContext } from '../contexts/pageContext';

export default function DisplayWinner({winner, username}) {

  const {setPage} = useContext(PageContext)

  function returnhome() {
    setPage({opened: false})
  }

  return (
    <div className={styles.display} >
      <h1>Congrats {username}! {winner.mark} won!</h1>
      <button onClick={returnhome}>Return</button>
    </div>
  )
}
