import { useEffect, useState } from "react"



import GameCover from "./GameCover"

import styles from '../../../../styles/lobby/body/Body.module.css'


export default function LobbyBody() {

    const [gameCover, setGameCover] = useState({activeIndex: 0, content: [{iconClassName: "fa fa-robot", title: "Single Player", description: "Compete to your heart's content against the computer", action: {text: "Start Game"}}]})

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
            const content = g.content.concat([
                {iconClassName: "fa fa-dice", title: "Classic", description: "Compete with a random player online and earn coins!", action: {text: "Play Classic"}},
                {iconClassName:"fa fa-layer-group", title: "Existing Room", description: "Join an existing room with a secret room ID", action: {text: "Join Room"}},
                {iconClassName: "fa fa-users", title: "Multiplayer", description: "Create a private room to play and invite friends to play with!", action: {text: "Create Room"}}
            ])
            return {activeIndex: g.activeIndex, content}
        })
    }, [setGameCover]);
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
                <GameCover {...gameCover.content[gameCover.activeIndex]} gameNavClick={gameNavClick}/>
            </div>
            </div>
            <div className={styles.bodyRight}>

            </div>

      </div>
    )
}