import styles from '../../styles/Lobby.module.css'
import {InfoContext} from '../contexts/infoContext'
import {useRouter} from 'next/router'
import CreateRoom from '../../components/createroom.js'
import {useState, useEffect, useContext} from 'react'

export default function Lobby() {
  const data = useContext(InfoContext);
  const router = useRouter();
  const [player, setPlayer] = useState({type: 'joiner', create: false});

  const create = async () => {
    data.playerType = "creator";
    setPlayer({
      type: "creator",
      create: true
    });
  }

  function join() {

  }

  useEffect(()=>{
    if(data.name === '') {
      router.push('/');
    }
  }, [data.name]);

  return (
    <div>
      <div className={styles.lobby}>
        <h1>Lobby</h1>
      </div>
      <div className={styles.join}>
        <button onClick={() => create()}>Create a room</button>
        <button onClick={() => join()}>Join</button>
      </div>
      {player.create &&
      <CreateRoom />}
    </div>
  )
}
