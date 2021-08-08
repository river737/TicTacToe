export default function SocketFunctions({io, socket}){
    io.data.users.id.push(socket.id)

    usernamePhase({io, socket})

    socket.on('disconnecting', () => {
        const {users} = io.data
        const ind = users.id.indexOf(socket.id)
        users.id.splice(ind, 1)

        if(socket.data?.username) {
            users.username.splice(ind, 1)
        }
    })
}

function usernamePhase({io, socket}) {
    socket.on('submit_username', ({username}) => {
        const {users} = io.data
        const res = {}
        if(users.has(username)) {
            res.success = false
            res.error = {msg: "Username is taken"}
        } else {
            io.data.users.add()
            socket.data.username = username
            res.success = true
            roomPhase({io, socket})
        }
        socket.emit('submit_username_response', res)
    })
}

function roomPhase({io, socket}) {
    socket.on('create room', ({config}) => {
        let room = require('crypto').randomBytes(5).toString('hex')
        io.data.rooms[room] = {config, players: {}}
        joinRoom({io, socket, room})
        socket.emit('create_room_response', {success: true})
    })
    socket.on('join private room', ({room}) => {
        const res = {}
        const {rooms} = io.data.rooms

        if(rooms[room]) {
            joinRoom({io, socket, room})
            res.success = true
        } else {
            res.success = false
            res.error = {msg: "Room not found"}
        }
        
        socket.emit('join_private_room_response', res)
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
}

function joinRoom({io, socket, room}) {
    io.data.rooms[room].players[socket.id] = {}
    gamePhase({io, socket})
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
