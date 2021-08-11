import styles from '../styles/Home.module.css'
import React, { createContext, useState, useEffect, useContext } from 'react'

import { SocketContext } from '../src/contexts/socketContext';

export const InfoContext = createContext();

export function InfoProvider({children}) {
  //2 types of player, joiner and creator
  // winner will be used for result and future purposes
  const [data, setData] = useState({name: '', playerType: "joiner"});
  const [clear, clearing] = useState(false);
  const [error, setError] = useState({verify: false, msg: ''});
  const {socket} = useContext(SocketContext);

  function inputChange(e) { // handles the username input change
    setData({name: e.target.value, playerType: "joiner", winner: null});
    setError({verify: false})
  }

  function submit() {
    if(data.name !== '') { // prevent submit if the username is blank
      clearing(true);
      socket.emit('submit_username', {username: name})
    } else setError({verify: true, msg: `Error! Name cannot be empty!`})
  }

  useEffect(()=>{
    socket.on('submit_username_response', (res) => { // waiting for a response from the server after submitting
      if(res.success) {

      } else { // an error occured
        const {msg} = res.error
        setError({verify: true, msg});
      }
    })
    return () => socket.off('submit_username_response')
  }, [])

  return (
      <InfoContext.Provider value={{data, setData}}>
        {
          !clear &&
          <>
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
          </>
        }
        {children}
      </InfoContext.Provider>
    )
}
