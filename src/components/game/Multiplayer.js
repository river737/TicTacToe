import { useContext, useEffect, useState, useRef } from "react"

import { SocketContext } from "../../contexts/socketContext"

import Game from "./game"
import MultiplayerSidebar from "./MultiplayerSidebar"

export default function Multiplayer({room, type}) {
    const size = 20
    const [turn, setTurn] = useState('x');
    const [moves, setMoves] = useState([])
    const [grids, setGrids] = useState(new Array(size).fill(new Array(size).fill('')))
    const {socket} = useContext(SocketContext)
    const myIndex = type === 'create' ? 0 : 1

    const gridWrapper = useRef()

    const displayX = ({i=0, j=0, mark=''}) => {
        // const {mark} = room.players[myIndex]
        
        setGrids(g => {
            const arr = g.map(a => [...a])
            arr[i][j] = mark
            return arr
        })
        setTurn(turn => turn==='o' ? 'x' : 'o');
    }

    const display = (i=0, j=0) => {
        const isMyTurn = room.players[myIndex].mark === turn
        if(grids[i][j]==='' && isMyTurn) {
            displayX({i, j, mark: turn})
            socket.emit('place_mark', {room: room.id, mark: turn, pos: {i, j}})
        }
    }

    
    useEffect(()=>{
        socket.on('place_mark_response', (res) => {
            if(res.success) {
                const {i, j} = res.pos
                displayX({i, j, mark: res.mark})
            } else {
                const {error} = res
                alert(error.msg)
            }
        })
        return () => {
            socket.off('place_mark_response')
        }
    }, [setGrids, socket])
    
    useEffect(()=>{
        socket.emit('game_phase', {room: room.id})
    }, [socket, room.id])

    useEffect(()=>{
        socket.on('opponent_left_room', ()=>{
            alert('opponent left the game')
        })
        return () => {
            socket.off('opponent_left_room')
        }
    }, [socket])

    const sidebar = <MultiplayerSidebar {...{room}}/>
    return (
        <Game {...{size, display, grids, sidebar, type: "multiplayer", ref: gridWrapper}}/>
    )
}