import {useState, useEffect, useContext} from 'react'

import styles from '../../styles/Lobby.module.css'
import {InfoContext} from '../components/form.js'
import CreateRoom from '../components/createroom.js'
import GameCover from '../components/lobby/GameCover'

export async function getServerSideProps(ctx) {
  const {req} = ctx
  const {cookie} = req.headers
  const username = cookie.split(';').find(row => row.startsWith('username='))?.split('=')[1]
  if(username===undefined || username==='') {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  } else {
    return {props: {}}
  }
}

export default function Lobby() {
  const {data, setData} = useContext(InfoContext);
  const {name} = data
  const [gameCover, setGameCover] = useState({activeIndex: 0, content: [{iconClassName: "fa fa-robot", title: "Single Player", description: "Compete to your heart's content against the computer", action: {text: "Start Game"}}]})
  const [player, setPlayer] = useState({type: 'joiner', create: false});
  const [creating, setCreating] = useState(true);
  const [style, setStyle] = useState(false);

  const gameNavClick = (n) => {
    setGameCover(g => {
      let length = g.content.length
      let index = g.activeIndex + n
      if(index >= length) {
        index = 0
      } else if(index<0) {
        index = length-1
      }
      return {activeIndex: index, content: g.content}
    })
  }

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
    setStyle(true)
    setGameCover(g => {
      const content = g.content.concat([
        {iconClassName: "fa fa-dice", title: "Classic", description: "Compete with a random player online and earn coins!", action: {text: "Play Classic"}},
        {iconClassName:"fa fa-layer-group", title: "Existing Room", description: "Join an existing room with a secret room ID", action: {text: "Join Room"}},
        {iconClassName: "fa fa-users", title: "Multiplayer", description: "Create a private room to play and invite friends to play with!", action: {text: "Create Room"}}
      ])
      return {activeIndex: g.activeIndex, content}
    })
  }, [setGameCover]);

  return (
    <div className={style ? styles.content : ""}>
      {
        creating &&
        <>
          <div className={styles.header}>
            <div className={styles.headerLeft}>
              <button className={`${styles.user}`}>
                Welcome, {name}!
              </button>
            </div>
            <div className={styles.headerMid}>
              <div>
                <span>Searching for Opponent</span>
                <span>Estimated Time: 0:09</span>
              </div>
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
              <div className={styles.sideTabs}>
                <span className={styles.activeUsers}>
                  <i className="fa fa-circle"/>
                </span>

              </div>
              <div className={styles.sideList}>
                {
                  [
                    {username: 'goku'},
                    {username: 'vegeta'},
                    {username: 'gohan'}
                  ].map(({username}, i) =>
                    <div key={i}>
                      <span>{username}</span>
                    </div>
                  )
                }

              </div>

            </div>
            <div className={styles.bodyMid}>
              <div>
                <GameCover {...gameCover.content[gameCover.activeIndex]} gameNavClick={gameNavClick}/>
              </div>
            </div>
            <div className={styles.bodyRight}>

            </div>

          </div>

        </>
      }
    </div>
  )
}
