import {useState, useEffect, useContext, useRef} from 'react'

import {InfoContext} from '../contexts/infoContext.js'
import { RouteContext } from '../contexts/routeContext'

import styles from '../../styles/Create.module.css'

const play = {
  single: "Single Player",
  classic: "Classic",
  existed: "Existing Room",
  multiplayer: "Multiplayer"
}

export default function CreateRoom(props) {
  const {setRoute} = useContext(RouteContext)
  const {data, setData} = useContext(InfoContext);
  let {type, setType} = props;
  const [style, setStyle] = useState(false);
  const [password, setPassword] = useState('');
  const ref = useRef()

  function copy() {
      var copyText = ref.current;
      copyText.select();
      copyText.setSelectionRange(0, 99999);
      document.execCommand("copy");
  }

  function submit() {
    setData(d => {
      const obj = {...d}
      obj.gameIsSet = true
      return obj
    });
    setRoute(obj => {
      const objx = {...obj}
      objx.name = 'game'
      
      return objx
    })
  }

  function back() {
    setStyle(false);
    setType("");
  }

  useEffect(() => {
    setStyle(true);
  }, [style])

  return (
      <div className={style ? styles.content : ""}>
        <div className={styles.fill}>

          {type===play.single &&
            <>
              <h1>No game is available. Only multiplayer game is available</h1>
              <button onClick={back}>Back</button>
            </>
          }
          {type===play.classic &&
            <>
              <h1>No player is available. Only multiplayer game is available</h1>
              <button onClick={back}>Back</button>
            </>
          }

          {type===play.existed &&
            <>
              <h1>No room is available. Only multiplayer game is available</h1>
              <button onClick={back}>Back</button>
            </>
          }

          {type===play.multiplayer &&
            <>
              <h2>Set a password</h2>
              <input onChange={(e) => setPassword(e.target.value)} ref={ref} type="text" value={password} />
              <button onClick={copy}>Copy to clipboard</button>
              <button onClick={submit}>Confirm</button>
              <button onClick={back}>Back</button>
            </>
          }
        </div>

      </div>
  )
}
