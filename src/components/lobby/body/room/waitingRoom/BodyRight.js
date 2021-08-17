
import styles from '../../../../../../styles/lobby/body/room/waitingRoom/BodyRight.module.css'

export default function BodyRight({room}) {
    return (

        <div className={styles.bodyRight}>
            <div className={styles.invite}>
                <span className={styles.widgetTitle}>Invite Players</span>
                <div className={styles.textBox}>
                    <span className={styles.left}>{room.id}</span>
                    <button>
                        <i className="fa fa-copy" />
                    </button>
                </div>
                <div className={styles.widgetDescription}>
                    Copy the room ID above
                </div>
            </div>
        </div>
    )
}