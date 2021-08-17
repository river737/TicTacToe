import { useState } from 'react'

import Game from '../../../game/game'
import WaitingRoom from './WaitingRoom'

export default function Room({setPage, type = "create", roomData={}}) {


    const [start, setStart] = useState({phase: type === 'create' ? 0 : 1})
    // phase 0 = opponent has not arrived
    // phase 1 = opponent arrived but no one has clicked start yet
    // phase 2 = you have clicked start
    // phase 3 = opponent has clicked start
    // phase 4 = both players have clicked start. will direct both players to the game

    const [room, setRoom] = useState({id: '', players: [{mark: 'x'}, {mark: 'o'}]})
    
    
    return (
        start.phase !== 4 ?
            <WaitingRoom {...{start, setStart, room, setRoom, setPage, roomData, type}}/>
        : <Game {...{room, type, setPage}}/>
    )
}