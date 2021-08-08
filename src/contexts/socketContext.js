import {createContext} from 'react'
import io from 'socket.io-client'
import {useEffect} from 'react'

export const SocketContext = createContext()
const socket = io('/', {path: '/api/socket'})
socket.on("connect", () => {   
    console.log("Socket Connected!", socket.id);
});

export default function SocketContextProvider({children}) {
    
    useEffect(() => {
        return ()=>socket.disconnect()
    }, [])
    return (
        <SocketContext.Provider value={{socket}}>
            {children}
        </SocketContext.Provider>
    )
}