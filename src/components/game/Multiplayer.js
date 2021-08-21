import { useContext, useEffect, useState, useRef } from "react"

import { SocketContext } from "../../contexts/socketContext"
import { AlertContext } from "../../contexts/alertContext"

import Game from "./game"
import MultiplayerSidebar from "./MultiplayerSidebar"

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
    
    const {setAlert} = useContext(AlertContext)
    const {socket} = useContext(SocketContext)

    const gridWrapper = useRef()

    const display = (i=0, j=0) => {
        if(grids[i][j]==='' && myTurn) {
            displayX({i, j, playerIndex: index.me})
            socket.emit('place_mark', {room: room.id, pos: {i, j}})
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
    
    useEffect(()=>{
        let mounted = true
        socket.on('place_mark_response', (res) => {
            if(res.success) {
                const {i, j} = res.pos
                if(mounted) displayX({i, j, playerIndex: index.opponent})
            } else {
                const {error} = res
                const {msg} = error
                if(mounted) setAlert({show: true, data: {title: "An error occured", theme: "danger", msg}})
            }
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
    }, [room.id])

    const sidebar = <MultiplayerSidebar {...{myTurn, size, gridWrapper, index, moves, room}}/>
    let lastMove = {...moves.slice(-1)[0]}
    lastMove.player = room.players[lastMove.playerIndex]
    
    return (
        <Game {...{lastMove, clicks: moves.length, size, display, grids, sidebar, type: "multiplayer", ref: gridWrapper}}/>
    )
}