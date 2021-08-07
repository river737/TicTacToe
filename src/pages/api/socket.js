// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {Server} from 'socket.io'

export default (req, res)  => {
  if(!res.socket?.server?.io) {
    console.log("socket server initialized")
    const socketServer = res.socket.server
    const io = new Server(socketServer, {path: '/api/socket'})
    io.on('connection', socket => {
      console.log(socket.id)
    })
    res.socket.server.io = io
  }
  res.end()
}
