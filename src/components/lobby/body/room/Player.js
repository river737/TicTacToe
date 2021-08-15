import styles from '../../../../../styles/lobby/body/room/Player.module.css'

export default function Player({icon, username='', stats={winRate: 0, gamesPlayed: 0}}) {
    return (
        <div className={`${styles.player} ${username==='' ? styles.empty : ''}`}>
            <div>
                <div className={styles.profilePic}>
                    {icon}
                </div>
                <span className={`${styles.username} preventOverflow`}>{username}</span>
            </div>
            <div className={styles.playerInfo}>
                <div>
                    <span className={`preventOverflow`}>Win Rate</span>
                    <span>{stats.winRate}%</span>
                </div>
                <div>
                    <span className={`preventOverflow`}>Games Played</span>
                    <span>{stats.gamesPlayed}</span>
                </div>
            </div>
        </div>
    )
}