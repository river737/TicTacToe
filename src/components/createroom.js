import styles from '../../styles/Create.module.css'
import {useState, useEffect, useContext, useRef} from 'react'
import {useRouter} from 'next/router'
import {InfoContext} from './form.js'
import Link from 'next/link'

const play = {
  single: "Single Player",
  classic: "Classic",
  existed: "Existing Room",
  multiplayer: "Multiplayer"
}

export default function CreateRoom({type}) {

  const router = useRouter();
//  const data = useContext(InfoContext);
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
    router.push('/game');
  }

  function back() {
    router.push('/');
  }

  useEffect(() => {
    setStyle(true);
  }, [style])

  return (
      <div className={style ? styles.content : ""}>
        <div className={styles.fill}>

          {type===play.single &&
            <>
              <h1>No game available</h1>
              <h1>Only multiplayer game is available</h1>
              <Link href="/"><a style={{color: "blue"}}>back</a></Link>
            </>
          }
          {type===play.classic &&
            <>
              <h1>No player available</h1>
              <h1>Only multiplayer game is available</h1>
              <Link href="/"><a style={{color: "blue"}}>back</a></Link>
            </>
          }

          {type===play.existed &&
            <>
              <h1>No room available</h1>
              <h1>Only multiplayer game is available</h1>
              <Link href="/"><a style={{color: "blue"}}>back</a></Link>
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
