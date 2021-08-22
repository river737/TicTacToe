import { useContext, useEffect, useState, useRef } from "react"

import { SocketContext } from "../../../contexts/socketContext"
import { AlertContext } from "../../../contexts/alertContext"

import Game from "../game"
import Sidebar from "./Sidebar"

export default function Multiplayer({room, type}) {
    const size = 20
    const index = {me: 0, opponent: 1}
    if(type!=='create') {
        index.me = 1
        index.opponent = 0
    }

    const [myTurn, setMyTurn] = useState(index.me === 0)
    const [moves, setMoves] = useState([])
    const [grids, setGrids] = useState(new Array(size).fill(new Array(size).fill('')))
    const [winner, setWinner] = useState(null)
    
    const {setAlert} = useContext(AlertContext)
    const {socket} = useContext(SocketContext)

    const gridWrapper = useRef()

    const display = (i=0, j=0) => {
        if(grids[i][j]==='' && myTurn && winner===null) {
            displayX({i, j, playerIndex: index.me})
            socket.emit('place_mark', {pos: {i, j}})
        }
    }

    const displayX = ({i=0, j=0, playerIndex = 0}) => {
        
        const {mark} = room.players[playerIndex]

        setGrids(g => {
            const arr = g.map(a => [...a])
            arr[i][j] = mark
            return arr
        })
        setMoves(a => a.concat({pos: {i, j}, playerIndex}))

        setMyTurn(b => !b)
    }

    const restartGame = () => {
        setGrids(new Array(size).fill(new Array(size).fill('')))
        setMoves([])
        setMyTurn(index.me === 0)
        setWinner(null)
    }
    
    useEffect(()=>{
        let mounted = true
        socket.on('place_mark_response', (res) => {
            const {i, j} = res.pos
            if(mounted) displayX({i, j, playerIndex: index.opponent})
        })
        socket.on('restart_game_response', res=> {
            if(res.success) {
                setAlert({show: true, data: {
                    title: "Game is restarting", msg: `Your opponent, ${room.players[index.opponent].username}, accepted your request to restart the game`
                }})
                restartGame()
            } else {
                setAlert({show: true, data: {
                    title: "Request rejected", msg: `Your opponent, ${room.players[index.opponent].username}, rejected your request to restart the game.`,
                }})
            }
        })
        socket.on('opponent_request_restart_game', () => {
            setAlert({show: true, data: {
                title: "Opponent request", msg: `Your opponent, ${room.players[index.opponent].username}, requested to restart the game.`,
                action: [
                    {
                        content: "Reject",
                        theme: 'secondary',
                        click() {
                            setAlert({show: false})
                            socket.emit('restart_game_response', {success: false})
                        }
                    },
                    {
                        content: "Accept",
                        theme: "primary",
                        click() {
                            setAlert({show: false})
                            socket.emit('restart_game_response', {success: true})
                            restartGame()
                        }
                    }
                ]
            }})
        })
        return () => {
            mounted = false
            socket.off('place_mark_response')
        }
    }, [setGrids, setMyTurn, setMoves])
    
    useEffect(()=>{
        socket.on('opponent_left_room', ()=>{
            setAlert({show: true, data: {title: 'Game Over', msg: 'Opponent has left the game', theme: 'warning'}})            
        })
        return () => {
            socket.off('opponent_left_room')
        }
    }, [])

    useEffect(()=>{
        socket.emit('game_phase', {room: room.id})
    }, [])

    const sidebar = <Sidebar {...{winner, myTurn, size, gridWrapper, index, moves, room}}/>
    let lastMove = {...moves.slice(-1)[0]}
    lastMove.player = room.players[lastMove.playerIndex]
    
    return (
        <Game {...{winner, setWinner, lastMove, clicks: moves.length, size, display, grids, sidebar, type: "multiplayer", ref: gridWrapper}}/>
    )
}