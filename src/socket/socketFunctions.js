export default function SocketFunctions({io, socket}){
    io.data.users.id.push(socket.id)

    usernamePhase({io, socket})
    socket.on('disconnecting', () => {
        const {users} = io.data
        const ind = users.id.indexOf(socket.id)
        users.id.splice(ind, 1)
        
        if(socket.data?.username) {
            users.username.splice(users.username.indexOf(socket.data.username), 1)
        }
    })
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
    socket.on('room_phase', () => {
        roomPhase({io, socket})
    })
}

function roomPhase({io, socket}) {
    socket.on('create_room', () => {
        let room = require('crypto').randomBytes(5).toString('hex')
        io.data.rooms[room] = {players: {}}
        joinRoom({io, socket, room})
        socket.emit('create_room_response', {success: true, room})
    })
    socket.on('leave_room', ({room}) => {
        const res = {success: true}
        leaveRoom({io, socket, room})
        socket.emit('leave_room_response', res)
    })
    socket.on('join_room', ({room}) => {
        const res = {}
        const {rooms} = io.data

        if(rooms[room]) {
            const {players} = rooms[room]
            const playersID = Object.keys(players)
            if(playersID.length>=2) {
                res.success = false
                res.error = {msg: "Room Full"}
            } else {
                const opponent = players[playersID[0]]
                res.success = true
                res.roomData = {
                    id: room,
                    opponent: {
                        username: opponent.username
                    }
                }
                socket.to(playersID[0]).emit('join_room_response', {
                    roomData: {
                        opponent: {username: socket.data.username}
                    }
                })
                joinRoom({io, socket, room})
            }
            
            
        } else {
            res.success = false
            res.error = {msg: "Room not found"}
        }
        
        socket.emit('join_room_response', res)
    })
    socket.on('join random room', () => {
        const res = {success: false}

        const {rooms} = io.data
        const keys = Object.keys(rooms)
        for(let k of keys) {
            const {players, config} = rooms[k]
            if(config.private) {
                continue
            }
            if(Object.keys(players).length>=2) {
                continue
            }

            res = {success: true, room: k}
            socket.join(k)
            joinRoom({io, socket, room: k})
            break
        }
        socket.emit('join_random_room_response', res)
    })
    socket.on('start_game', () => {
        gamePhase({io, socket})
    })
}

function joinRoom({io, socket, room}) {
    socket.join(room)
    io.data.rooms[room].players[socket.id] = {username: socket.data.username}
}

function leaveRoom({io, socket, room}) {
    const roomX = io.data.rooms[room]
    delete roomX.players[socket.id]
    const playersID = Object.keys(roomX.players)
    if(playersID.length===0) {
        delete io.data.rooms[room]
    } else {
        socket.to(playersID[0]).emit('opponent_left_room')
    }
    socket.leave(room)
}

function gamePhase({io, socket}) {
    socket.on('place mark', ({room, position}) => {
        const res = {}
        const {rooms} = io.data
        const {players} = rooms[room]

        if(Object.keys(players).includes(socket.id)) { // check if the user is in the room
            res.success = true
            res.pos = position
        } else {
            res.success = false
            res.error = {msg: "User validation failed"}
        }
        io.to(room).emit('place mark response', res)
    })
}
