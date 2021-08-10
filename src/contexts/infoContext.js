import React, { createContext, useState} from 'react'

export const InfoContext = createContext();

export function InfoProvider({children}) {
  //2 types of player, joiner and creator
  // winQuant is the number of symbols set in a row to win
  // winner will be used for result and future purposes
  const [data, setData] = useState({name: '', playerType: "joiner", createGridLength: 0, winQuant: 0, winner: null});
  
  return (
      <InfoContext.Provider value={{...data, setData}}>
        {children}
      </InfoContext.Provider>
    )
}
