import React, { createContext, useState } from 'react'

export const InfoContext = createContext();

export function InfoProvider({children}) {
  //2 types of player, joiner and creator
  const [data, setData] = useState({name: '', identified: false, playerType: "joiner", gameIsSet: false});

  return (
      <InfoContext.Provider value={{data, setData}}>
        {children}
      </InfoContext.Provider>
    )
}
