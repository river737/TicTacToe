import { useContext } from "react"
import { InfoContext } from "../../contexts/infoContext"

import styles from '../../../styles/lobby/Header.module.css'

export default function LobbyHeader() {
    const {data} = useContext(InfoContext)
    const {name} = data
    return (
        <div className={styles.header}>
            <div className={styles.headerLeft}>
                <button className={`${styles.user}`}>
                    Welcome, {name}!
                </button>
            </div>
            <div className={styles.headerMid}>
            <div>
                
            </div>
            </div>
            <div className={styles.headerRight}>
            <span className={styles.medals} title="Total games won">
                <i className="fa fa-medal"/> 2
            </span>
            <span className={styles.coins} title="Coins earned from playing">
                <i className="fa fa-coins"/> 3196
            </span>
            </div>
        </div>
    )
}