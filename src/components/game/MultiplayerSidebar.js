import {useContext, useState} from 'react'

import { SocketContext } from "../../contexts/socketContext"
import { PageContext } from '../../contexts/pageContext'

import styles from '../../../styles/game/MultiplayerSidebar.module.css'

import highlightGrid from '../../functions/highlightGrid'

export default function MultiplayerSidebar({myTurn, size=20, gridWrapper, index={me: 0, opponent: 1}, moves=[], room}) {
    const {setPage} = useContext(PageContext)
    const {socket} = useContext(SocketContext)

    const [history, setHistory] = useState({show: false})


    return (
        <div className={styles.multiplayerSidebar}>
            <div className={styles.controls}>
                {
                    [
                        {
                            icon: 'fa fa-compress-arrows-alt', text: 'Latest',
                            action() {
                                const latest = moves.slice(-1)[0]
                                if(latest) {
                                    const {i, j} = latest.pos
                                    highlightGrid(gridWrapper.current?.children[i * size + j], [styles.latest])
                                }
                            }
                        },
                        {
                            icon: 'fa fa-history', text: 'History',
                            action() {
                                setHistory(obj => {
                                    return {show: !obj.show}
                                })
                            }
                        },
                        {
                            icon: 'fa fa-redo', text: 'Restart',
                            action() {

                            }
                        },
                        {
                            icon: 'fa fa-sign-out-alt', text: 'Quit', 
                            action() {
                                socket.emit('leave_game', {room: room.id})
                                setPage({opened: false})
                            }
                        }
                    ].map(({icon, text, action}, i) => (
                        <div key={i} onClick={action}>
                            <button>
                                <i className={icon}/>
                            </button>
                            <span className="preventOverflow">{text}</span>
                        </div>
                    ))
                }
            </div>
            <div className={styles.status}>
                {
                    myTurn ? "It's your turn" : "Opponent's turn"
                }
            </div>
            <div className={styles.players}>
                {
                    room.players.map(({mark, username, icon}, i) => {
                        let clicks = moves.length / 2
                        if(index.me === 0) {
                            clicks += myTurn ? 0 : 0.5
                        } else {
                            clicks += myTurn ? -0.5 : 0
                        }
                        
                        return (
                            <div key={i} className={styles.player}>
                                <div className={styles.profilePic}>
                                    <span>{icon}</span>
                                </div>
                                <div className={styles.playerDetails}>
                                    <div className={styles.username}>{username}</div>
                                    <div className={styles.extraInfo}>
                                        <span>Mark: {mark}</span>
                                        <span>Clicks: {clicks}</span>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            {
                history.show ? 
                    <div className={styles.history}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Player</th>
                                    <th>i</th>
                                    <th>j</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    moves.map(({pos, playerIndex}, x) => {
                                        const {i, j} = pos
                                        const player = playerIndex === index.me ? "Me" : room.players[playerIndex].username
                                        return (
                                            <tr key={x}>
                                                <td>{player}</td>
                                                <td>{i}</td>
                                                <td>{j}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                : ''
            }
        </div>
    )
}