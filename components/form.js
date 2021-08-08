import styles from '../styles/Home.module.css'
import React, { createContext, useState, useEffect, useContext } from 'react'

import { SocketContext } from '../src/contexts/socketContext';

export const NameContext = createContext();

export function NameProvider({children}) {
  const [name, setName] = useState('');
  const [error, setError] = useState({verify: false, msg: ''});
  const {socket} = useContext(SocketContext)

  function inputChange(e) { // handles the username input change
    setName(e.target.value);
    setError({verify: false})
  }

  function submit() {
    if(name !== '') { // prevent submit if the username is blank
      socket.emit('submit_username', {username: name})
    }
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
      <NameContext.Provider value={{name}}>
        <div className={styles.wrapper}>
          <div className={styles.login}>
            <h1>One more step...</h1>
            <input type="text" className={styles.input} onChange={inputChange} placeholder="Enter a name" />
            <button className={styles.button} onClick={submit}>Submit</button>
            {
              error.verify && 
                <h3>
                  {
                    error.msg!=='' ? error.msg : `Error! Name cannot be empty!`
                  }
                </h3>
            }
          </div>
        </div>
        {children}
      </NameContext.Provider>
    )
}
