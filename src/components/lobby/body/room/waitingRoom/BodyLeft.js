import Player from "../Player"

import styles from '../../../../../../styles/lobby/body/room/waitingRoom/BodyLeft.module.css'

export default function BodyLeft({room, start, startGame}) {
    return (
        <div className={styles.bodyLeft}>
            <Player {...room.players[0]}/>
            <div className={styles.versus}>
                VS
            </div>
            <Player {...room.players[1]}/>
            <div className={styles.startBtn}>
                <button onClick={startGame} disabled={start.phase !== 1 && start.phase !== 3}>
                    {
                        start.phase === 0 ? 
                            '2 Players Required'
                        : start.phase === 1 ? 
                            'Start Game'
                        : start.phase === 2 ? 
                            'Waiting for Opponent'
                        : start.phase === 3 ? 
                            'Opponent is Waiting. Start Now!'
                        : <i className="fa fa-spin fa-circle-notch" />
                    }
                </button>
            </div>
        </div>
    )
}