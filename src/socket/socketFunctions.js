import store from 'store-js'

import {storeArray, storeObject} from '../store/storeFunctions'

export default function SocketFunctions({io, socket}){
    storeArray.update({name: 'users', keys: ['id'], type: 'push', value: [socket.id]})

    socket.on('disconnecting', () => {
        const rooms = store.get('rooms')
        unmountEvents({socket})

        storeArray.delete({name: 'users', keys: ['id'], value: [socket.id]})
        
        socket.rooms?.forEach(roomID => {
            if(rooms[roomID]) {
                leaveRoom({io, socket, roomID})
            }
        })
        if(socket.data?.username) {
            storeArray.delete({name: 'users', keys: ['username'], value: [socket.data.username]})
        }
    })
}

function unmountEvents({socket}) {
    socket?.removeAllListeners(socket?.eventNames())
}

function lobbyPhase({io, socket}) {
}

function joinRoomPhase({io, socket, roomID}) {
    unmountEvents({socket})
    socket.join(roomID)

    
    socket.on('leave_room', () => {
        leaveRoom({io, socket, roomID})
    })

    socket.on('start_game', () => {
        try {
            const {data: rooms} = storeObject.update({name: 'rooms', keys: [roomID, 'players', socket.id, 'start'], value: true})
            const room = rooms[roomID]

            const {players={}} = room
            const playersID = Object.keys(room.players)
            const ind = playersID.indexOf(socket.id)
            
            
            if(playersID.map(id => players[id].start).includes(false) && playersID.length===2) {
                const opponentID = playersID[ind ===1 ? 0 : 1]
                socket.to(opponentID).emit('opponent_start_game')
            }  else {
                io.to(roomID).emit('warp_to_game')
            }
        }
        catch(err) {

        }
    })

    socket.on('game_phase', () => {
        gamePhase({io, socket, roomID})
    })
}

function leaveRoom({io, socket, roomID}) {
    const rooms = store.get('rooms')
    const room = rooms[roomID]

    if(!room) return

    storeObject.delete({name: 'rooms', keys: [roomID, 'players', socket.id]})

    const playersID = Object.keys(room.players)
    if(playersID.length===0) {
        storeObject.delete({name: 'rooms', keys: [roomID]})
    } else {
        socket.to(playersID[0]).emit('opponent_left_room')
    }
    socket.leave(roomID)
}

function gamePhase({io, socket, roomID}) {
    unmountEvents({socket})

    let room = store.get('rooms')[roomID]
    if(!room) room = {}
    const {players={}} = room
    const playersID = Object.keys(players)
    const opponent = playersID[playersID.indexOf(socket.id) === 0 ? 1 : 0]

    socket.on('place_mark', data => {
        socket.to(opponent).emit('place_mark_response', {pos: data.pos})
    })

    socket.on('restart_game', () => {
        socket.to(opponent).emit('opponent_request_restart_game')
    })

    socket.on('restart_game_response', (data) => {
        socket.to(opponent).emit('restart_game_response', {success: data.success}) 
    })

    socket.on('leave_game', () => {
        lobbyPhase({io, socket})
        leaveRoom({io, socket, roomID})
    })
}
