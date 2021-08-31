import { useEffect, useContext } from "react"

import GameCover from "./GameCover"
import Room from "./room/Room"
import JoinRoom from './room/JoinRoom'

import { PageContext } from "../../../contexts/pageContext"

import styles from '../../../../styles/lobby/body/Body.module.css'


export default function LobbyBody({gameCover, setGameCover}) {
    const {setPage} = useContext(PageContext)
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
                                component: <JoinRoom />
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
                                component: <Room {...{type: "create"}}/>
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
            </div>
            <div className={styles.bodyMid}>
            <div>
                <GameCover {...gameCover.content[gameCover.activeIndex]} {...{gameNavClick}}/>
            </div>
            </div>
            <div className={styles.bodyRight}>

            </div>

      </div>
    )
}
