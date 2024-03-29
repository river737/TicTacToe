import {useContext, useState} from 'react'

import { PageContext } from '../../../contexts/pageContext'
import { AlertContext } from '../../../contexts/alertContext'

import styles from '../../../../styles/game/multiplayer/Sidebar.module.css'

import highlightGrid from '../../../functions/highlightGrid'



export default function Sidebar({fetchX, winner, myTurn, size=20, gridWrapper, index={me: 0, opponent: 1}, moves=[], room}) {
    const {setPage} = useContext(PageContext)
    const {setAlert} = useContext(AlertContext)

    const [history, setHistory] = useState({show: false})

    const latestHighlight = ({i, j}) => {
        highlightGrid(gridWrapper.current?.children[i * size + j], [styles.latest])
    }
    let status = myTurn ? "It's your turn" : "Opponent's turn"
    if(winner) {
        status = room.players[index.me].mark === winner.mark ? 'Hooray, You won!' : 'You lost :('
    }
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
                                    latestHighlight({i, j})
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
                            async action() {
                                setAlert({show: true, data: {
                                    title: "Success",
                                    msg: `A request to restart the game was successfully sent to your opponent, ${room.players[index.opponent].username}`,
                                    theme: "success",
                                }})
                                await fetchX({query: 'type=restartRequest'})
                            }
                        },
                        {
                            icon: 'fa fa-sign-out-alt', text: 'Quit',
                            async action() {
                                setPage({opened: false})
                                await fetchX({query: 'type=quitGame'})
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
                {status}
            </div>
            <div className={styles.players}>
                {
                    room.players.map(({mark, username, icon}, i) => {
                        let clicks = 0
                        moves.forEach(val => val.playerIndex === i ? clicks += 1 : '')

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
                                    <th colSpan="2">{room.players[0].username}</th>
                                    
                                    <th colSpan="2">{room.players[1].username}</th>
                                </tr>
                                <tr>
                                    <th>Row</th>
                                    <th>Column</th>
                                    <th>Row</th>
                                    <th>Column</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    moves.map(({pos, playerIndex}, x) => {
                                        const {i, j} = pos
                                        return (
                                            <tr key={x} onClick={()=>latestHighlight({i, j})}>
                                                {
                                                    playerIndex === 0 ?
                                                        <>
                                                            <td>{i}</td>
                                                            <td>{j}</td>
                                                            <td></td>
                                                            <td></td>
                                                        </>
                                                    : 
                                                        <>
                                                            <td></td>
                                                            <td></td>
                                                            <td>{i}</td>
                                                            <td>{j}</td>
                                                        </>
                                                }
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