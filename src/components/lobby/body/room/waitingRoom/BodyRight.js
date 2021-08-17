
import styles from '../../../../../../styles/lobby/body/room/waitingRoom/BodyRight.module.css'

export default function BodyRight({room}) {
    const copy = async () => {
        try {
            await navigator.clipboard.writeText(room.id)
        }
        catch(err) {
            console.log('copy to clipboard failed', err)
        }
    }
    return (

        <div className={styles.bodyRight}>
            <div className={styles.invite}>
                <span className={styles.widgetTitle}>Invite Players</span>
                <div className={styles.textBox}>
                    <span className={styles.left}>{room.id}</span>
                    <button onClick={copy}>
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