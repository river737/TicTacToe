import { useContext, useState, useEffect } from 'react'

import { PusherContext } from '../../../../contexts/pusherContext'
import { PageContext } from '../../../../contexts/pageContext'

import Room from './Room'

import styles from '../../../../../styles/lobby/body/room/JoinRoom.module.css'

async function fetchX({query='', body, socketId})  {
    const obj = {socketId}
    if(body) obj.data = body
    try {
        const x = await fetch(`/api/multiplayer/room?${query}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify(obj)
        })
        const res = await x.json()

        return res
    }
    catch(err) {
        return {success: false}
    }
}

export default function JoinRoom() {
    const {setPage} = useContext(PageContext)
    const {socketId} = useContext(PusherContext)

    const [roomID, setRoomID] = useState('')

    const back = () => {
        setPage({opened: false})
    }
    const submit = async () => {
        const res = await fetchX({query: 'type=joinRoom', body: {roomID}, socketId})
        if(res.success) {
            const {roomData} = res
            setPage({
                opened: true,
                component: <Room {...{setPage, type: 'join', roomData}}/>
            })
        } else {
            alert(res.error.msg)
        }
    }
    
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