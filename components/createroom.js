import styles from '../styles/Create.module.css'
import {useState, useEffect, useContext} from 'react'
import {useRouter} from 'next/router'
import {InfoContext} from './form.js'

export default function CreateRoom() {

  const router = useRouter();
  const data = useContext(InfoContext);
  const [privategame, setPrivategame] = useState(false);
  const [password, setPassword] = useState('');

  function createprivate() {
    setPrivategame(true);
  }

  function createpublic() {
    router.push('/game');
  }

  function submit() {
    router.push('/game');
  }

  return (
      <div className={styles.content}>

      {!privategame &&
        <>
          <h2>Only accessable by password... sure?</h2>
          <button onClick={createprivate}>Create Private Room</button>
          <h2>Careful! Anyone can access your game</h2>
          <button onClick={createpublic}>Create Public Room</button>
        </>
      }

        {privategame &&
          <>
            <h2>Just one more step... set a password</h2>
            <input onChange={(e) => setPassword(e.target.value)} type="text" />
            <h2>Err... dont forget to copy your password!</h2>
            <button onClick={submit}>Confirm</button>
          </>
        }
      </div>
  )
}
