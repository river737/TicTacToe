// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {Server} from 'socket.io'

import SocketFunctions from '../../socket/socketFunctions'

export default function handle(req, res) {
  if(!res.socket?.server?.io) {
    console.log("Socket Server Initialized")
    const socketServer = res.socket.server
    const io = new Server(socketServer, {path: '/api/socket'})
    io.on('connection', socket => {
      SocketFunctions({io, socket})
    })
    io.data = {users: {id: [], username: []}, rooms: {}}

    /* 
      rooms: {
        "unique_room_id": {
          config: {
            private: true
          },
          players: {
            "socket_id": {
              start: true || false
            }
          }
        }
      }
    */
    res.socket.server.io = io
  }
  res.end()
}
