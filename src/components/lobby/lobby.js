import { useContext, useEffect } from "react"

import { SocketContext } from "../../contexts/socketContext"

import styles from '../../../styles/lobby/Lobby.module.css'

import LobbyBody from './body/Body'
import LobbyHeader from './Header'

export default function Lobby() {
  const {socket} = useContext(SocketContext)
  useEffect(()=>{
    socket.emit('room_phase')
  }, [])
  return (
    <div className={styles.content}>
      <LobbyHeader />
      <LobbyBody />
    </div>
  )
}
