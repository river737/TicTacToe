import { useEffect } from "react"

import GameCover from "./GameCover"
import Room from "./room/Room"
import JoinRoom from './room/JoinRoom'

import styles from '../../../../styles/lobby/body/Body.module.css'


export default function LobbyBody({setPage, gameCover, setGameCover}) {
    const gameNavClick = (n) => {
        setGameCover(g => {
            let length = g.content.length
            let index = g.activeIndex + n
        
            if(index >= length) index = 0
            else if(index<0) index = length-1
            
            return {activeIndex: index, content: g.content}
        })
    }

    useEffect(()=>{
        setGameCover(g => {
            let content = g.content
            if(g.content.length===1) 
            content = g.content.concat([
                {
                    iconClassName: "fa fa-dice", title: "Classic", description: "Compete with a random player online and earn coins!", 
                    action: {text: "Play Classic"}
                },
                {
                    iconClassName:"fa fa-layer-group", title: "Existing Room", description: "Join an existing room with a secret room ID", 
                    action: {
                        text: "Join Room",
                        click: () => {
                            setPage({
                                opened: true,
                                component: <JoinRoom {...{setPage}}/>
                            })
                        }
                    }
                },
                {
                    iconClassName: "fa fa-users", title: "Multiplayer", description: "Create a private room to play and invite friends to play with!", 
                    action: {
                        text: "Create Room",
                        click: () => {
                            setPage({
                                opened: true,
                                component: <Room {...{setPage, type: "create"}}/>
                            })
                        }
                    }
                }
            ])
            return {activeIndex: g.activeIndex, content}
        })
    }, [setGameCover, setPage]);
    return (
        <div className={styles.body}>
            <div className={styles.bodyLeft}>
            <div className={styles.sideTabs}>
                <span className={styles.activeUsers}>
                <i className="fa fa-circle"/>
                </span>

            </div>
            <div className={styles.sideList}>
                {
                    [
                        {username: 'goku'},
                        {username: 'vegeta'},
                        {username: 'gohan'}
                    ].map(({username}, i) =>
                        <div key={i}>
                        <span>{username}</span>
                        </div>
                    )
                }

            </div>

            </div>
            <div className={styles.bodyMid}>
            <div>
                <GameCover {...gameCover.content[gameCover.activeIndex]} {...{gameNavClick, setPage}}/>
            </div>
            </div>
            <div className={styles.bodyRight}>

            </div>

      </div>
    )
}