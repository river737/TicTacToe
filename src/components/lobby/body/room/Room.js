import styles from '../../../../../styles/lobby/body/Room.module.css'

import Player from './Player'

export default function Room({setPage}) {
    const back = () => {
        setPage({opened: false})
    }
    const minimize = () => {

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
                <div className={styles.headerRight}>
                    <button onClick={minimize}>
                        <i className="fa fa-compress"/>
                        Minimize
                    </button>
                </div>
            </div>
            <div className={styles.body}>
                <div className={styles.bodyLeft}>
                    <Player {...{
                        icon: <i className="fa fa-user-astronaut"/>,
                        username: "the_rock",
                        stats: {
                            winRate: 53,
                            gamesPlayed: 21
                        }
                    }}/>
                    <div className={styles.versus}>
                        VS
                    </div>
                    <Player {...{
                        icon: <i className="fa fa-user-secret"/>,
                        username: "john_cena",
                        stats: {
                            winRate: 67,
                            gamesPlayed: 9
                        }
                    }}/>
                    <div className={styles.startBtn}>
                        <button>Start Game</button>
                    </div>
                </div>
                <div className={styles.bodyRight}>

                </div>
            </div>
        </div>
    )
}