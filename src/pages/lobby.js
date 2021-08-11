import styles from '../../styles/Lobby.module.css'
import {InfoContext} from '../../components/form.js'
import {useRouter} from 'next/router'
import CreateRoom from '../../components/createroom.js'
import {useState, useEffect, useContext} from 'react'
import Link from 'next/link'

export default function Lobby() {
  const {data, setData} = useContext(InfoContext);
  const router = useRouter();
  const [player, setPlayer] = useState({type: 'joiner', create: false});
  const [creating, setCreating] = useState(true);

  const create = async () => {
    setData({name: data.name, playerType: "creator", winner: null})
    setPlayer({
      type: "creator",
      create: true
    });
  }

  function join() {
    setCreating(false);
  }

  useEffect(()=>{
    if(data.name === '') {
      router.push('/');
    }
  }, []);

  return (
    <div className={styles.content}>
      {
        creating &&
        <>
          <div className={styles.lobby}>
            <h1>Lobby</h1>
          </div>
          <div className={styles.join}>
            <button onClick={create}>Create a room</button>
            <button onClick={join}>Join</button>
          </div>
          {player.create &&
          <CreateRoom />}
        </>
      }
      {
        !creating &&
        <>
          <br /><br /><br /><br /><br /><br />
          <p>Ooops! No game is available. Click here to go <Link href="/"><a style={{color:"blue"}}>back</a></Link></p>
        </>
      }
    </div>
  )
}
