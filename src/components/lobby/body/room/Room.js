import { useContext, useState, useEffect } from 'react'

import styles from '../../../../../styles/lobby/body/Room.module.css'

import { SocketContext } from '../../../../contexts/socketContext'
import { InfoContext } from '../../../../contexts/infoContext'
import { RouteContext } from '../../../../contexts/routeContext'

import Player from './Player'

export default function Room({setPage, type = "create", roomData={}}) {
    const {setRoute} = useContext(RouteContext)
    const {socket} = useContext(SocketContext)
    const {data} = useContext(InfoContext)
    const {name} = data

    const [start, setStart] = useState({phase: type === 'create' ? 0 : 1})
    // phase 0 = opponent has not arrived
    // phase 1 = opponent arrived but no one has clicked start yet
    // phase 2 = you have clicked start
    // phase 3 = opponent has clicked start
    // phase 4 = both players have clicked start. will direct both players to the game

    const [room, setRoom] = useState({id: '', players: [{}, {}]})
    
    const back = () => {
        socket.emit('leave_room', {room: room.id})
    }
    const minimize = () => {

    }
    const startGame = () => {
        socket.emit('start_game')
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
                                    }
                                }
                            ]
                            obj.id = room
                            return obj
                        })
                    }
                } else {
                    alert(res.error.msg)
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
                            }
                        })
                    }
                    return obj
                })
            })
            
        } else if(type==='join') {
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
                        }
                    },
                    {
                        username: `${name} (me)`,
                        icon: <i className="fa fa-user-secret"/>,
                        stats: {
                            winRate: 68,
                            gamesPlayed: 91
                        }
                    }
                ]
                return obj
            })
        }
        socket.on('leave_room_response', res => {
            if(res.success) {
                setPage({opened: false})
            }
        })
        socket.on('opponent_left_room', () => {
            setRoom(r => {
                const obj = {...r}
                const index = type === 'create' ? 0 : 1
                r.players = [r.players[index]]
                return obj
            })
        })
        socket.on('start_game_response', res => {
            if(res.success) {
                setRoute({name: 'game'})
            } else {
                setStart(s => {
                    const obj = {...s}
                    return obj
                })
            }
        })
        
        
        return () => {
            mounted = false
            socket.off('leave_room_response')
            socket.off('create_room_response')
            socket.off('join_room_response')
            socket.off('opponent_left_room')
        }
    }, [])
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.headerLeft}>
                    <button onClick={back}>
                        <i className="fa fa-angle-double-left"/>
                        Return
                    </button>
                </div>
                <div className={styles.headerRight}>
                    <button onClick={minimize}>
                        <i className="fa fa-compress"/>
                        Minimize
                    </button>
                </div>
            </div>
            <div className={styles.body}>
                <div className={styles.bodyLeft}>
                    <Player {...room.players[0]}/>
                    <div className={styles.versus}>
                        VS
                    </div>
                    <Player {...room.players[1]}/>
                    <div className={styles.startBtn}>
                        <button onClick={startGame}>
                            {
                                start.phase === 0 ? 
                                    '2 Players Required'
                                : start.phase === 1 ? 
                                    'Start Game'
                                : start.phase === 2 ? 
                                    'Waiting for Opponent'
                                : start.phase === 3 ? 
                                    'Opponent is Waiting. Start Now!'
                                : <i className="fa fa-spin fa-circle-notch" />
                            }
                        </button>
                    </div>
                </div>
                <div className={styles.bodyRight}>
                    <div className={styles.invite}>
                        <span className={styles.widgetTitle}>Invite Players</span>
                        <div className={styles.textBox}>
                            <span className={styles.left}>{room.id}</span>
                            <button>
                                <i className="fa fa-copy" />
                            </button>
                        </div>
                        <div className={styles.widgetDescription}>
                            Copy the room ID above
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}