import { useEffect, useState, useRef } from "react"

import { PageContext } from "../../contexts/pageContext"

import styles from '../../../styles/lobby/Lobby.module.css'

import Tutorial from './body/tutorial/Tutorial.js'
import LobbyBody from './body/Body'
import Bot from '../game/singleplayer/Bot.js'

export default function Lobby() {
  const button = useRef();
  const menubar = useRef();
  const [tutorial, setTutorial] = useState(false);
  const [page, setPage] = useState({opened: false, component: <></>, minimized: false})
  const [menu, setMenu] = useState(false);
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

  function showmenu() {
    menu ? setMenu(false) : setMenu(true)
  }

  useEffect(()=>{
    if(menu) tutorial ? button.current.style.display="none" : button.current.style.display="block";
    if(page.opened) {
      if(menu) button.current.style.display="none";
    }
  }, [tutorial, page]);

  return (
    <div className={styles.content}>
      <PageContext.Provider value={{setPage}}>
        {
          page.opened ?
            page.component
          : tutorial ? <Tutorial {...{setTutorial}} />
          : <LobbyBody {...{gameCover, setGameCover}}/>
        }
        {
          !tutorial && !page.opened && <button className={styles.menu} onClick={showmenu} ref={menubar}><i className="fas fa-bars fa-3x"></i></button>
        }
        {
          menu &&
          <div className={styles.menubar} ref={button}>
            <button className={styles.button} onClick={opentutorial}>How to play <i className="far fa-arrow-alt-circle-right"></i></button>
          </div>
        }
      </PageContext.Provider>

    </div>
  )
}
