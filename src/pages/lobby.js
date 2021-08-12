import Link from 'next/link'

import {useRouter} from 'next/router'
import {useState, useEffect, useContext} from 'react'

import styles from '../../styles/Lobby.module.css'
import {InfoContext} from '../components/form.js'
import CreateRoom from '../components/createroom.js'

export default function Lobby() {
  const {data, setData} = useContext(InfoContext);
  const {name} = data
  const router = useRouter();
  const [player, setPlayer] = useState({type: 'joiner', create: false});
  const [creating, setCreating] = useState(true);

  const create = () => {
    setData({playerType: "creator", winner: null})
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
          <div className={styles.header}>
            <div className={styles.headerLeft}>
              <button className={`${styles.user}`}>
                Welcome, {name}!
              </button>
            </div>
            <div className={styles.headerRight}>
              <span className={styles.medals} title="Total games won">
                <i className="fa fa-medal"/> 2
              </span>
              <span className={styles.coins} title="Coins earned from playing">
                <i className="fa fa-coins"/> 3196
              </span>
            </div>
          </div>

          <div className={styles.body}>
            <div className={styles.bodyLeft}>

            </div>
            <div className={styles.bodyMid}>
              <div>
                <div className={styles.gameCover}>
                  
                </div>
                <div className={styles.gameNav}>
                  <button>
                    <i className="fa fa-chevron-left"/>
                  </button>

                  <button className={styles.gameNavBtn}>Single Player</button>

                  <button>
                    <i className="fa fa-chevron-right"/>
                  </button>
                  
                </div>
              </div>
            </div>
            <div className={styles.bodyRight}>

            </div>

          </div>
          
          <div className={styles.join}>
            <button onClick={create}>Create Room</button>
            <button onClick={join}>Join</button>
          </div>
          { 
            player.create && <CreateRoom />
          }
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
