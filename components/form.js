import React, { createContext, useState } from 'react'

export const InfoContext = createContext();

export function InfoProvider({children}) {
  //2 types of player, joiner and creator
  // winner will be used for result and future purposes
  const [data, setData] = useState({name: '', playerType: "joiner"});

  return (
      <InfoContext.Provider value={{data, setData}}>
        {children}
      </InfoContext.Provider>
    )
}
