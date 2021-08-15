import { useContext, useState, useEffect } from 'react'

import { SocketContext } from '../../../../contexts/socketContext'

import Room from './Room'

import styles from '../../../../../styles/lobby/body/room/JoinRoom.module.css'

export default function JoinRoom({setPage}) {
    const {socket} = useContext(SocketContext)

    const [roomID, setRoomID] = useState('')

    const back = () => {
        setPage({opened: false})
    }
    const submit = () => {
        socket.emit('join_room', {room: roomID})
    }

    useEffect(()=>{
        socket.on('join_room_response', res => {
            if(res.success) {
                const {roomData} = res
                setPage({
                    opened: true,
                    component: <Room {...{setPage, type: 'join', roomData}}/>
                })
            } else {
                alert(res.error.msg)
            }
        })
        return () => {
            socket.off('join_room_response')
        }
    }, [])
    
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.headerLeft}>
                    <button onClick={back}>
                        <i className="fa fa-angle-double-left"/>
                        Return
                    </button>

                </div>
            </div>
            <div className={styles.body}>
                <div className={styles.form}>
                    <div className={styles.formTitle}>
                        Join Room
                    </div>
                    <label>
                        <span>Room ID</span>
                        <div className={styles.textBox}>
                            <input value={roomID} onChange={(e) => setRoomID(e.target.value)} type="text" />
                        </div>
                    </label>
                    <button onClick={submit}>Submit</button>
                </div>
            </div>
        </div>
    )
}