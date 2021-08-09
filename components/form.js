import styles from '../styles/Home.module.css'
import React, { createContext, useState, useEffect, useContext } from 'react'

import { SocketContext } from '../src/contexts/socketContext';

export const InfoContext = createContext();

export function InfoProvider({children}) {
  //2 types of player, joiner and creator
  // winQuant is the number of symbols set in a row to win
  // winner will be used for result and future purposes
  const [data, setData] = useState({name: '', playerType: "joiner", createGridLength: 0, winQuant: 0, winner: null});
  const [error, setError] = useState({verify: false, msg: ''});
  const {socket} = useContext(SocketContext)

  function inputChange(e) { // handles the username input change
    setData({name: e.target.value, playerType: "joiner", createGridLength: 0, winQuant: 0, winner: null});
    setError({verify: false})
  }

  function submit() {
    if(data.name !== '') { // prevent submit if the username is blank
      socket.emit('submit_username', {username: name})
    } else setError({verify: true, msg: `Error! Name cannot be empty!`})
  }

  useEffect(()=>{
    socket.on('submit_username_response', (res) => { // waiting for a response from the server after submitting
      if(res.success) {
        const x = document.querySelector(`.${styles.wrapper}`);
        x.style.zIndex="-2";
        x.style.opacity="0";
      } else { // an error occured
        const {msg} = res.error
        setError({verify: true, msg});
      }
    })
    return () => socket.off('submit_username_response')
  }, [])

  return (
      <InfoContext.Provider value={data}>
        <div className={styles.wrapper}>
          <div className={styles.login}>
            <h1>One more step...</h1>
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
        {children}
      </InfoContext.Provider>
    )
}
