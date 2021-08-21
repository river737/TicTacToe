import {useContext} from 'react'

import { SocketContext } from "../../contexts/socketContext"
import { PageContext } from '../../contexts/pageContext'

import styles from '../../../styles/game/MultiplayerSidebar.module.css'

export default function MultiplayerSidebar({room}) {
    const {setPage} = useContext(PageContext)
    const {socket} = useContext(SocketContext)
    return (
        <div className={styles.multiplayerSidebar}>
            <div className={styles.controls}>
                {
                    [
                        {
                            icon: 'fa fa-compress-arrows-alt', text: 'Latest',
                            action() {

                            }
                        },
                        {
                            icon: 'fa fa-history', text: 'History',
                            action() {

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
        </div>
    )
}