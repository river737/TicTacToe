import styles from '../../styles/Create.module.css'
import {useState, useEffect, useContext, useRef} from 'react'
import {useRouter} from 'next/router'
import {InfoContext} from './form.js'

const play = {
  single: "Single Player",
  classic: "Classic",
  existed: "Existing Room",
  multiplayer: "Multiplayer"
}

export default function CreateRoom(props) {
  const {data, setData} = useContext(InfoContext);
  let type = props.type;
  let setType = props.settype;
  const router = useRouter();
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
    data.gameIsSet = true;
    setData(data);
    router.push('/game');
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
              <input onChange={(e) => setPassword(e.target.value)} ref={ref} type="text" />
              <button onClick={copy}>Copy to clipboard</button>
              <button onClick={submit}>Confirm</button>
              <button onClick={back}>Back</button>
            </>
          }
        </div>

      </div>
  )
}
