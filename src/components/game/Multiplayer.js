import { useContext, useEffect, useState, useRef } from "react"

import { SocketContext } from "../../contexts/socketContext"

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
    const {socket} = useContext(SocketContext)
    

    const gridWrapper = useRef()

    const display = (i=0, j=0) => {
        if(grids[i][j]==='' && myTurn) {
            displayX({i, j})
            socket.emit('place_mark', {room: room.id, pos: {i, j}})
        }
    }

    const displayX = ({i=0, j=0}) => {
        setMyTurn(b => {
            const currentIndex = index[b ? 'me' : 'opponent']
            const {mark} = room.players[currentIndex]
            
            setMoves(a => {
                const arr = [...a]
                arr.push({pos: {i, j}, currentIndex})
                return arr
            })
            setGrids(g => {
                const arr = g.map(a => [...a])
                arr[i][j] = mark
                return arr
            })
            return !b
        })
    }
    
    useEffect(()=>{
        let mounted = true
        socket.on('place_mark_response', (res) => {
            if(res.success) {
                const {i, j} = res.pos
                if(mounted) displayX({i, j})
            } else {
                const {error} = res
                alert(error.msg)
            }
        })
        return () => {
            mounted = false
            socket.off('place_mark_response')
        }
    }, [setGrids, socket, setMyTurn])
    
    useEffect(()=>{
        socket.on('opponent_left_room', ()=>{
            alert('opponent left the game')
        })
        return () => {
            socket.off('opponent_left_room')
        }
    }, [socket])

    useEffect(()=>{
        socket.emit('game_phase', {room: room.id})
    }, [socket, room.id])

    const sidebar = <MultiplayerSidebar {...{room}}/>
    return (
        <Game {...{size, display, grids, sidebar, type: "multiplayer", ref: gridWrapper}}/>
    )
}