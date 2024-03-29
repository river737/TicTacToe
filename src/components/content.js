import styles from '../../styles/Extention.module.css'
import {useRouter} from 'next/router'

const Content = ({player}) => {
  const router = useRouter();
  function enterlobby() {
    router.push('/lobby');
  }
  return (
    <div className={styles.content}>
      {player !== '' &&
      <>
        <h1 className={styles.greet}>Hello {player}</h1>
        <button className={styles.proceed} onClick={enterlobby}>Continue</button>
      </>
      }
      {player === '' && <h1>Tic Tac Toe</h1>}
    </div>
  )
}
export default Content;
