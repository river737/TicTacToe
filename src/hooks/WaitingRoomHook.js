import { useEffect, useContext } from "react";

import { PusherContext } from "../contexts/pusherContext";
import { InfoContext } from "../contexts/infoContext";
import { PageContext } from "../contexts/pageContext";
import { AlertContext } from "../contexts/alertContext";

import globalFetch from '../functions/globalFetch'


export default function WaitingRoomHook({setStart, setRoom, type, roomData, room}) {
    const {setPage} = useContext(PageContext)
    const {socketId, personalChannel} = useContext(PusherContext)
    const {data} = useContext(InfoContext)
    const {setAlert} = useContext(AlertContext)
    const {name} = data

    const fetchX = async ({query='', body}) => {
        return await globalFetch({path: '/api/multiplayer/room', query, body, socketId})
    }
    
    const back = async () => {
        setPage({opened: false})
        await fetchX({query: 'type=leaveRoom'})
    }
    const minimize = () => {

    }
    const startGame = async () => {
        setStart(s => {
            const obj = {...s}
            if(obj.phase ===1) obj.phase = 2
            if(obj.phase===3) obj.phase = 4
            return obj
        })
        const res = await fetchX({query: 'type=startGame'})
        if(res.success) {
            if(res?.warpGame) {
                warpGame()
            }
        } else {
            setAlert({show: true, data: {
                title: 'An error occured',
                msg: res?.error?.msg || "Please refresh the page.",
                theme: 'danger'
            }})
        }
    }

    const startGameX = () => {
        setStart(s => {
            const obj = {...s}
            if(obj.phase === 1) obj.phase  = 3
            else if(obj.phase === 2) obj.phase = 4
            return obj
        })
    }

    const joinRoom = ({roomData}) => {
        const {opponent} = roomData
        
        setRoom(r => {
            const obj = {...r}
            if(obj.players.length < 2) {
                setStart(s => {
                    const obj = {...s}
                    obj.phase = 1
                    return obj
                })
                obj.players = obj.players.concat({
                    icon: <i className="fa fa-user-secret"/>,
                    username: opponent.username,
                    stats: {
                        winRate: 67,
                        gamesPlayed: 9
                    },
                    mark: 'o'
                })
            }
            return obj
        })
    }

    const leftRoom = () => {
            
        setAlert({show: true, data: {
            title: "Opponent left room", msg: `Your opponent has left the room`, theme: 'warning'
        }})
        setRoom(r => {
            const obj = {...r}
            const index = type === 'create' ? 0 : 1

            obj.players = [obj.players[index]]
            return obj
        })
        setStart(s => {
            const obj = {...s}
            obj.phase = 0
            return obj
        })
    }

    const warpGame = () => {
        setStart(s => {
            const obj = {...s}
            obj.phase = 4
            return obj
        })
    }

    useEffect(()=>{
        let mounted = true
        if(type==='create') {
            setRoom(r => {
                const obj = {...r}
                obj.players = [
                    {
                        username: `${name} (me)`,
                        icon: <i className="fa fa-user-astronaut"/>,
                        stats: {
                            winRate: 53,
                            gamesPlayed: 21
                        },
                        mark: 'x'
                    }
                ]
                return obj
            })
            const fetchEffect = async () => {
                const res = await fetchX({query: 'type=createRoom'})
                if(res.success) {
                    const {room} = res
                    if(!mounted) return
                    setRoom(r => {
                        const obj = {...r}
                        obj.id = room
                        return obj
                    })
                    
                } else {
                    setAlert({show: true, data: {title: "An error occured", msg: res?.error?.msg, theme: 'danger'}})
                }
            }
            fetchEffect()
            
             
        } else if(type==='join'){
            if(mounted) setRoom(r => {
                const {id, opponent} = roomData
                const obj = {...r}
                obj.id = id
                obj.players = [
                    {
                        username: opponent.username,
                        icon: <i className="fa fa-user-astronaut"/>,
                        stats: {
                            winRate: 53,
                            gamesPlayed: 21
                        },
                        mark: 'x'
                    },
                    {
                        username: `${name} (me)`,
                        icon: <i className="fa fa-user-secret"/>,
                        stats: {
                            winRate: 68,
                            gamesPlayed: 91
                        },
                        mark: 'o'
                    }
                ]
                return obj
            })
        }
        
        return () => {
            mounted = false
        }
    }, [setRoom, setStart, setAlert])

    useEffect(() => {
        const eventList = [
            {name: 'warpGame', callback: warpGame}, 
            {name: 'leftRoom', callback: leftRoom}, 
            {name: 'startGame', callback: startGameX}
        ]
        if(room.id!=='' && room.id!==undefined && room.id!=='undefined') {
            if(type==='create') {
                eventList.push({name: 'joinRoom', callback: joinRoom})
            }
            eventList.forEach(val => personalChannel?.bind(val.name, val.callback))
        }
        return () => {
            eventList.forEach(val => personalChannel?.unbind(val.name))
        }
    }, [room.id, setStart, setAlert, setRoom])

    return {back, minimize, startGame}
}