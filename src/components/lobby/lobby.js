import { useContext, useEffect, useState } from "react"

import { SocketContext } from "../../contexts/socketContext"

import styles from '../../../styles/lobby/Lobby.module.css'

import LobbyBody from './body/Body'
import Bot from '../../components/game/bot.js'

export default function Lobby() {
  const {socket} = useContext(SocketContext)
  const [page, setPage] = useState({opened: false, component: <></>, minimized: false})
  const [gameCover, setGameCover] = useState(
    {activeIndex: 0,
      content: [
        {
          iconClassName: "fa fa-robot",
          title: "Single Player",
          description: "Compete to your heart's content against the computer",
          action: {
            text: "Start Game",
            click: () => {
              setPage({
                  opened: true,
                  component: <Bot />
              })
            }
          }
        }
     ]
  })

  useEffect(()=>{
    socket.emit('room_phase')
  }, [socket])
  return (
    <div className={styles.content}>
      {
        page.opened ?
          page.component
        : <LobbyBody {...{setPage, gameCover, setGameCover}}/>
      }

    </div>
  )
}
