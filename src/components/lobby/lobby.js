import { useContext, useEffect, useState, useRef } from "react"

import { SocketContext } from "../../contexts/socketContext"
import { PageContext } from "../../contexts/pageContext"

import styles from '../../../styles/lobby/Lobby.module.css'

import Tutorial from './body/tutorial/Tutorial.js'
import LobbyBody from './body/Body'
import Bot from '../game/singleplayer/Bot.js'

export default function Lobby() {
  const {socket} = useContext(SocketContext);
  const button = useRef();
  const [tutorial, setTutorial] = useState(false);
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

  function opentutorial(e) {
    setTutorial(true);
  }

  useEffect(()=>{
    tutorial ? button.current.style.display="none" : button.current.style.display="block";
    if(page.opened) {
      button.current.style.display="none"
    }
  }, [tutorial, page]);

  useEffect(()=>{
    socket.emit('lobby_phase')
  }, [])
  return (
    <div className={styles.content}>
      <PageContext.Provider value={{setPage}}>
        {
          page.opened ?
            page.component
          : tutorial ? <Tutorial {...{setTutorial}} />
          : <LobbyBody {...{gameCover, setGameCover}}/>
        }
      <button className={styles.button} onClick={opentutorial} ref={button}>How to play <i class="far fa-arrow-alt-circle-right"></i></button>
      </PageContext.Provider>

    </div>
  )
}
