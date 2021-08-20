import { useContext, useEffect, useState } from "react"

import { SocketContext } from "../../contexts/socketContext"
import { PageContext } from "../../contexts/pageContext"

import Game from "./game"

export default function Multiplayer({room, type}) {
    const size = 20
    const [turn, setTurn] = useState('x');
    const [grids, setGrids] = useState(new Array(size).fill(new Array(size).fill('')))
    const {socket} = useContext(SocketContext)
    const myIndex = type === 'create' ? 0 : 1

    const displayX = ({i=0, j=0, mark=''}) => {
        setGrids(g => {
            const arr = g.map(a => a.map(val => val))
            arr[i][j] = mark
            return arr
        })
        setTurn(turn => turn==='o' ? 'x' : 'o');
    }

    const display = (i=0, j=0) => {
        const isMyTurn = room.players[myIndex].mark === turn
        if(grids[i][j]==='' && isMyTurn) {
            socket.emit('place_mark', {room: room.id, mark: turn, pos: {i, j}})
        }
    }

    
    useEffect(()=>{
        socket.on('place_mark_response', (res) => {
            if(res.success) {
                const {i, j} = res.pos
                displayX({i, j, mark: res.mark})
            }
        })
        return () => {
            socket.off('place_mark_response')
        }
    }, [setGrids, socket])
    
    useEffect(()=>{
        socket.emit('game_phase', {room: room.id})
    }, [socket, room.id])

    const sidebar = <Sidebar {...{room}}/>
    return (
        <Game {...{display, grids, sidebar, type: "multiplayer"}}/>
    )
}

function Sidebar({room}) {
    const {setPage} = useContext(PageContext)
    const {socket} = useContext(SocketContext)
    const terminate = () => {
        socket.emit('leave_game', {room: room.id})
        setPage({opened: false})
    }
    return (
        <div>
            <button onClick={terminate}>Terminate</button>
        </div>
    )
}