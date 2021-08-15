import { useContext, useEffect, useState } from "react"

import { SocketContext } from "../../contexts/socketContext"

import styles from '../../../styles/lobby/Lobby.module.css'

import LobbyBody from './body/Body'
import LobbyHeader from './Header'

export default function Lobby() {
  const {socket} = useContext(SocketContext)
  const [gameCover, setGameCover] = useState({activeIndex: 0, content: [{iconClassName: "fa fa-robot", title: "Single Player", description: "Compete to your heart's content against the computer", action: {text: "Start Game"}}]})
  const [page, setPage] = useState({opened: false, component: <></>, minimized: false})

  useEffect(()=>{
    socket.emit('room_phase')
  }, [])
  return (
    <div className={styles.content}>
      <LobbyHeader />
      {
        page.opened ? 
          page.component
        : <LobbyBody {...{setPage, gameCover, setGameCover}}/>
      }
      
    </div>
  )
}
