import { useContext, useEffect, useState, useRef } from "react"

import { PusherContext } from "../../../contexts/pusherContext"
import { AlertContext } from "../../../contexts/alertContext"

import Game from "../game"
import Sidebar from "./Sidebar"

import globalFetch from '../../../functions/globalFetch'



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
    const {personalChannel, socketId} = useContext(PusherContext)

    const gridWrapper = useRef()

    const fetchX = async ({query='', body}) => {
        return await globalFetch({path: '/api/multiplayer/game', query, body, socketId})
    }

    const display = async (i=0, j=0) => {
        if(grids[i][j]==='' && myTurn && winner===null) {
            displayX({i, j, playerIndex: index.me})
            await fetchX({query: 'type=placeMark', body: {pos: {i, j}}})
            return {mark: room.players[index.me].mark}
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

    const placeMark = (res) => {
        const {i, j} = res.pos
        displayX({i, j, playerIndex: index.opponent})
    }

    const restartResponse = (res)=> {
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
    }

    const restartRequest = () => {
        setAlert({show: true, data: {
            title: "Opponent request", msg: `Your opponent, ${room.players[index.opponent].username}, requested to restart the game.`,
            action: [
                {
                    content: "Reject",
                    theme: 'secondary',
                    async click() {
                        setAlert({show: false})
                        await fetchX({query: 'type=restartResponse', body: {success: false}})
                    }
                },
                {
                    content: "Accept",
                    theme: "primary",
                    async click() {
                        setAlert({show: false})
                        restartGame()
                        await fetchX({query: 'type=restartResponse', body: {success: true}})
                    }
                }
            ]
        }})
    }

    const quitGame = ()=>{
        setAlert({show: true, data: {title: 'Game Over', msg: 'Opponent has left the game', theme: 'warning'}})            
    }
    
    useEffect(()=>{
        const eventList = [
            {name: 'placeMark', callback: placeMark},
            {name: 'restartRequest', callback: restartRequest},
            {name: 'restartResponse', callback: restartResponse},
            {name: 'quitGame', callback: quitGame}
        ]
        eventList.forEach(val => personalChannel?.bind(val.name, val.callback))

        return () => {
            eventList.forEach(val => personalChannel?.unbind(val.name))
        }
    }, [setGrids, setMyTurn, setMoves])

    const sidebar = <Sidebar {...{fetchX, winner, myTurn, size, gridWrapper, index, moves, room}}/>
    let lastMove = {...moves.slice(-1)[0]}
    lastMove.player = room.players[lastMove.playerIndex]
    
    return (
        <Game {...{winner, setWinner, lastMove, clicks: moves.length, size, display, grids, sidebar, type: "multiplayer", ref: gridWrapper}}/>
    )
}