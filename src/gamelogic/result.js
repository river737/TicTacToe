import styles from '../../styles/game/singleplayer/Display.module.css'
import {useContext} from 'react'

import { PageContext } from '../contexts/pageContext';

export default function DisplayWinner({winner, username, type, symb}) {

  const {setPage} = useContext(PageContext)

  function returnhome() {
    setPage({opened: false})
  }

  return (
      <div className={styles.display} >
        {
          type==='bot' ? symb===winner.mark ? <h1>Congrats {username}! {winner.mark} won!</h1> : <h1>Don't worry {username}! You will win next time!</h1>
          : <h1>{winner.mark} won!</h1>
        }
        <button onClick={returnhome}>Return</button>
      </div>
  )
}
