import { useEffect, useContext } from "react";

import { SocketContext } from "../contexts/socketContext";
import { InfoContext } from "../contexts/infoContext";
import { PageContext } from "../contexts/pageContext";
import { AlertContext } from "../contexts/alertContext";

export default function WaitingRoomHook({setStart, setRoom, type, roomData, room}) {
    const {setPage} = useContext(PageContext)
    const {socket} = useContext(SocketContext)
    const {data} = useContext(InfoContext)
    const {setAlert} = useContext(AlertContext)
    const {name} = data

    const back = () => {
        socket.emit('leave_room')
        setPage({opened: false})
    }
    const minimize = () => {

    }
    const startGame = () => {
        socket.emit('start_game')
        setStart(s => {
            const obj = {...s}
            if(obj.phase ===1) obj.phase = 2
            if(obj.phase===3) obj.phase = 4
            return obj
        })
    }

    useEffect(()=>{
        let mounted = true // for preventing state update when the component is unmounting
        if(type==='create') {
            socket.emit('create_room')
            socket.on('create_room_response', res => {
                if(res.success) {
                    const {room} = res
                    if(mounted) {
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
                            obj.id = room
                            return obj
                        })
                    }
                } else {
                    setAlert({show: true, data: {title: "An error occured", msg: res.error.msg, theme: 'danger'}})
                }
            })
            socket.on('join_room_response', ({roomData}) => {
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
            })
            
        }
        socket.on('opponent_left_room', () => {
            
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
        })
        
        socket.on('opponent_start_game', () => {
            setStart(s => {
                const obj = {...s}
                if(obj.phase === 1) obj.phase  = 3
                else if(obj.phase === 2) obj.phase = 4
                return obj
            })
        })
        socket.on('warp_to_game', () => {
            setStart(s => {
                const obj = {...s}
                obj.phase = 4
                return obj
            })
        })
        
        
        return () => {
            mounted = false
            socket.off('create_room_response')
            socket.off('join_room_response')
            socket.off('opponent_left_room')
            socket.off('opponent_start_game')
            socket.off('warp_to_game')
        }
    }, [setStart, setRoom, setPage, name, type])

    useEffect(()=>{
        let mounted = true
        if(type==='join' && mounted)
        setRoom(r => {
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
        return () => {
            mounted = false
        }
    }, [setRoom, type, name, roomData])

    return {back, minimize, startGame}
}