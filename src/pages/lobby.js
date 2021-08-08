import styles from '../../styles/Lobby.module.css'
import Form from '../../components/form.js'
import {useRouter} from 'next/router'
import {useState, useEffect} from 'react'

export default function Lobby() {
  const router = useRouter();
  const [playername, thisplayer] = useState('');
  function player(name) {
    thisplayer(name);
  }
  // useEffect(()=>{
  //   if(playername === '') {
  //     router.push('/');
  //   }
  // }, [playername]);
  return (
    <div>
    <div className={styles.lobby}>
      <h1>Lobby</h1>
    </div>
    <Form onPlayer={player} />
    </div>
  )
}
