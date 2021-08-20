import styles from '../../../../../styles/lobby/body/room/WaitingRoom.module.css'

import BodyRight from './waitingRoom/BodyRight'
import BodyLeft from './waitingRoom/BodyLeft'

import WaitingRoomHook from '../../../../hooks/WaitingRoomHook'

export default function WaitingRoom({start, setStart, room, setRoom, roomData, type}) {
    
    const {back, minimize, startGame} = WaitingRoomHook({setRoom, setStart, roomData, type, room})
    
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.headerLeft}>
                    <button onClick={back}>
                        <i className="fa fa-angle-double-left"/>
                        Return
                    </button>
                </div>
                <div className={styles.headerRight}>
                    <button onClick={minimize}>
                        <i className="fa fa-compress"/>
                        Minimize
                    </button>
                </div>
            </div>
            <div className={styles.body}>
                <BodyLeft {...{room, start, startGame}}/>
                <BodyRight {...{room}}/>
            </div>
        </div>
    )
}