import styles from '../../styles/Home.module.css'

import {InfoContext} from '../contexts/infoContext.js'
import { SocketContext } from '../contexts/socketContext';

import {useState, useContext, useEffect} from 'react'

import {useRouter} from 'next/router'

export default function Home() {
  const router = useRouter()
  const {setData, name} = useContext(InfoContext);
  const [error, setError] = useState({verify: false, msg: ''});
  const {socket} = useContext(SocketContext)

  function inputChange(e) { // handles the username input change
    setData({name: e.target.value});
    setError({verify: false})
  }

  function submit() {
    if(name !== '') { // prevent submit if the username is blank
      socket.emit('submit_username', {username: name})
    } else setError({verify: true, msg: `Error! Name cannot be empty!`})
  }

  useEffect(()=>{
    socket.on('submit_username_response', (res) => { // waiting for a response from the server after submitting
      if(res.success) {
        router.push('/lobby')
      } else { // an error occured
        const {msg} = res.error
        setError({verify: true, msg});
      }
    })
    return () => socket.off('submit_username_response')
  }, [])
  return (
    <div className={styles.container}>
      <div>
        <span className={styles.title}>Tic Tac Toe</span>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.login}>
          <span className={styles.title}>One more step...</span>
          <input type="text" className={styles.input} onChange={inputChange} placeholder="Enter a name" />
          <button className={styles.button} onClick={submit}>Submit</button>
          {
            error.verify &&
              <h3>
                {
                  error.msg
                }
              </h3>
          }
        </div>
      </div>
    </div>
  )
}
