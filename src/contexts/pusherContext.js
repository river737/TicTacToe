import {useEffect, createContext, useState} from 'react'
import Pusher from 'pusher-js'

import globalFetch from '../functions/globalFetch'

export const PusherContext = createContext()


export default function PusherContextProvider({children}) {
    const [socketId, setSocketId] = useState('')
    const [personalChannel, setPersonalChannel] = useState()
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY, {
        cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
        encrypted: true
    });
    useEffect(() => {
        
        try {
            pusher.connection.bind('connected', () => {
                const {socket_id} = pusher.connection
                setPersonalChannel(pusher.subscribe(socket_id))
                const disconnect = async (e) => {
                    await globalFetch({path: 'api/pusher/disconnect', socketId: socket_id})
                }
                window.removeEventListener('beforeunload', disconnect)
                window.addEventListener('beforeunload', disconnect)
                console.log('Pusher Connected!', socket_id)
                setSocketId(socket_id)
            })
        }
        catch(err) {
            console.log(err)
        }
        return ()=>{
            pusher.disconnect()
        }
    }, [setSocketId])
    return (
        <PusherContext.Provider value={{pusher, socketId, personalChannel}}>
            {children}
        </PusherContext.Provider>
    )
}