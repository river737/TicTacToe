import { useState } from "react"

import { PageContext } from "../../contexts/pageContext"

import styles from '../../../styles/lobby/Lobby.module.css'

import LobbyBody from './body/Body'
import Bot from '../game/singleplayer/Bot.js'

export default function Lobby() {
  const [page, setPage] = useState({opened: false, component: <></>, minimized: false})
  const [gameCover, setGameCover] = useState({
    activeIndex: 0,
      content: [
        {
          iconClassName: "fa fa-robot",
          title: "Single Player",
          description: "Compete to your heart's content against the computerx",
          action: {
            text: "Start Game",
            click: () => {
              setPage({
                  opened: true,
                  component: <Bot {...{setPage}}/>
              })
            }
          }
        }
      ]
  })

  return (
    <div className={styles.content}>
      <PageContext.Provider value={{setPage}}>
        {
          page.opened ?
            page.component
          : <LobbyBody {...{gameCover, setGameCover}}/>
        }
      </PageContext.Provider>

    </div>
  )
}
