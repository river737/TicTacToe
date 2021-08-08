import styles from '../styles/Home.module.css'
import React, { createContext, useState, useEffect } from 'react'

export const NameContext = createContext();

export function NameProvider({children}) {
  const [Name, Player] = useState('');
  const [currentname, name] = useState('');
  const [clicks, clicking] = useState(0);
  const [error, display] = useState(false);

  function addingname(thisname) {
    name(thisname);
  }

  function submit() {
    clicking(clicks + 1);
    if(currentname === '') {
      display(true);
    }
  }

  useEffect(() => {
    if(currentname !== '' && clicks > 0) {
      const x = document.querySelector(`.${styles.wrapper}`);
      x.style.zIndex="-2";
      x.style.opacity="0";
      Player(currentname);
    }
  }, [clicks])

  return (
      <NameContext.Provider value={{name: Name}}>
        <div className={styles.wrapper}>
          <div className={styles.login}>
            <h1>One more step...</h1>
            <input type="text" className={styles.input} onChange={(e) => addingname(e.target.value)} placeholder="Enter a name" />
            <button className={styles.button} onClick={() => submit()}>Submit</button>
            {error && <h3>Error! Name cannot be empty!</h3>}
          </div>
        </div>
        {children}
      </NameContext.Provider>
    )
}
