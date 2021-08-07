import {createContext} from 'react'
import io from 'socket.io-client'
import {useEffect} from 'react'

const SocketContext = createContext()
const socket = io('/', {path: '/api/socket'})

export default function SocketContextProvider({children}) {

    useEffect(() => {
        socket.on("connect", () => {
            console.log("SOCKET CONNECTED!", socket.id);
        });
        if(socket) return ()=>socket.disconnect()
    }, [])
    return (
        <SocketContext.Provider value={{socket}}>
            {children}
        </SocketContext.Provider>
    )
}