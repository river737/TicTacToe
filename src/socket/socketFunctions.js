export default function SocketFunctions({io, socket}){
    io.data.users.id.push(socket.id)

    usernamePhase({io, socket})
    socket.on('disconnecting', () => {
        unmountEvents({socket})
        const {users} = io.data
        const ind = users.id.indexOf(socket.id)
        users.id.splice(ind, 1)
        
        socket.rooms?.forEach(id => {
            if(io.data.rooms[id]) {
                leaveRoom({io, socket, room:id})
            }
        })
        if(socket.data?.username) {
            users.username.splice(users.username.indexOf(socket.data.username), 1)
        }
    })
}

function unmountEvents({socket}) {
    socket?.removeAllListeners(socket?.eventNames())
}

function usernamePhase({io, socket}) {
    socket.on('submit_username', ({username, type}) => {
        const {users} = io.data
        const res = {}
        if(socket.data?.username) {
            res.success = false
            res.error = {msg: "You already have a username"}
        } else {
            if(users.username.includes(username)) {
                res.success = false
                res.error = {msg: "Username is taken"}
            } else {
                users.username.push(username)
                socket.data.username = username
                res.success = true
            }
        }
        if(!type) {
            socket.emit('submit_username_response', res)
        }
    })
    socket.on('lobby_phase', () => {
        lobbyPhase({io, socket})
    })
}

function lobbyPhase({io, socket}) {
    unmountEvents({socket})

    socket.on('create_room', () => {
        let roomID = require('crypto').randomBytes(5).toString('hex')
        io.data.rooms[roomID] = {players: {}}
        joinRoomPhase({io, socket, roomID})
        socket.emit('create_room_response', {success: true, room: roomID})
    })
    socket.on('join_room', ({room: roomID}) => {
        const room = io.data.rooms[roomID]
        const eventName = 'join_room_response'

        if(!room) {
            socket.emit(eventName, {succes: false, error: {msg: "Room not found"}})
            return 
        }

        const {players = {}} = room
        const playersID = Object.keys(players)

        if(playersID.length>=2) {
            socket.emit(eventName, {success: false, error: {msg: "Room full"}})
            return
        }

        const opponentID = playersID[0]

        socket.emit(eventName, {
            success: true, 
            roomData: {
                id: roomID,
                opponent: {
                    username: players[opponentID].username
                }
            }
        })
        joinRoomPhase({io, socket, roomID})
        
        // sent to the opponent to notify that you have joined the room
        socket.to(opponentID).emit(eventName, {
            roomData: {
                opponent: {username: socket.data.username}
            }
        })
    })
}

function joinRoomPhase({io, socket, roomID}) {
    unmountEvents({socket})
    socket.join(roomID)
    io.data.rooms[roomID].players[socket.id] = {username: socket.data.username, start: false}

    socket.on('leave_room', () => {
        leaveRoom({io, socket, roomID})
    })

    socket.on('start_game', () => {
        const roomX = io.data.rooms[roomID]
        const {players} = roomX
        const playersID = Object.keys(roomX.players)
        const ind = playersID.indexOf(socket.id)
        
        players[socket.id].start = true
        
        if(playersID.map(id => players[id].start).includes(false) && playersID.length===2) {
            const opponentID = playersID[ind ===1 ? 0 : 1]
            socket.to(opponentID).emit('opponent_start_game')
        }  else {
            io.to(roomID).emit('warp_to_game')
        }
    })

    socket.on('game_phase', () => {
        gamePhase({io, socket, roomID})
    })
}

function leaveRoom({io, socket, room}) {
    const roomX = io.data.rooms[room]
    if(!roomX) return

    delete roomX.players[socket.id]
    const playersID = Object.keys(roomX.players)
    if(playersID.length===0) {
        delete io.data.rooms[room]
    } else {
        socket.to(playersID[0]).emit('opponent_left_room')
    }
    socket.leave(room)
}

function gamePhase({io, socket, roomID}) {
    unmountEvents({socket})

    const room = io.data.rooms[roomID]
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
        leaveRoom({io, socket, room: roomID})
    })
}
