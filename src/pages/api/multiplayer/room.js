import {parse} from 'querystring'
import store from 'store-js'

import { storeObject } from '../../../store/storeFunctions'
import globalLeaveRoom from '../../../pusher/game/globalLeaveRoom'

export default function handle(req, res) {
    if(req.method!=='POST') {
        res.end()
    } else post(req, res)
}

function post(req, res) {
    const {type} = parse(req.url.split('?')[1])
    switch(type) {
        case 'createRoom':
            createRoom(req, res)
            break;
        case 'joinRoom':
            joinRoom(req, res)
            break;
        case 'startGame':
            startGame(req, res);
            break;
        case 'leaveRoom':
            leaveRoom(req, res);
            break;
        default: 
            res.end()
            break;
    }
}

function createRoom(req, res) {
    const {socketId} = req.body
    const roomID = require('crypto').randomBytes(4).toString('hex')
    const {username} = store.get('users')[socketId]
    storeObject.update({
        name: 'rooms', keys: [roomID], 
        value: {
            players: {[socketId]: {username, start: false}}
        }
    })
    storeObject.update({name: 'users', keys: [socketId, 'activeRoom'], value: {id: roomID}})
    
    res.send({success: true, room: roomID})
}

function joinRoom(req, res) {
    const {socketId, data} = req.body
    const {roomID} = data
    const room = store.get('rooms')[roomID]

    if(!room) {
        res.json({succes: false, error: {msg: "Room not found"}})
        return 
    }

    const {players = {}} = room
    const playersID = Object.keys(players)

    if(playersID.length>=2) {
        res.json({success: false, error: {msg: "Room full"}})
        return
    }
    
    

    // sent to the opponent to notify that you have joined the room
    
    const {pusher} = res.socket.server
    
    const {username} = store.get('users')[socketId]
    const roomData = {opponent: {username}}
    pusher.trigger(playersID[0], 'joinRoom', {roomData})
    
    
    storeObject.update({name: 'users', keys: [playersID[0], 'activeRoom', 'opponent'], value: {id: socketId}})
    storeObject.update({name: 'users', keys: [socketId, 'activeRoom'], value: {id: roomID, opponent: {id: playersID[0]}}})
    storeObject.update({name: 'rooms', keys: [roomID, 'players', socketId], value: {username, start: false}})

    res.json({
        success: true, 
        roomData: {
            id: roomID,
            opponent: {
                username: players[playersID[0]].username
            }
        }
    })
}

function startGame(req, res) {
    const {socketId} = req.body
    const {pusher} = res.socket.server
    try {
        const {id: roomID, opponent} = store.get('users')[socketId].activeRoom
        
        const {data: rooms} = storeObject.update({name: 'rooms', keys: [roomID, 'players', socketId, 'start'], value: true})

        const {players={}} = rooms[roomID]
        const playersID = Object.keys(players)
        
        
        const warpGame = playersID.filter(id => players[id].start).length == 2
        const eventName = `${warpGame ? 'warp' : 'start'}Game`
        
        pusher.trigger(opponent.id, eventName, {})
        
        res.json({success: true, warpGame})
    }
    catch(err) {
        res.json({success: false, error: {msg: "Server Error"}})
    }
}

function leaveRoom(req, res) {
    const {socketId} = req.body
    const {pusher} = res.socket.server

    globalLeaveRoom({socketId, pusher, pusherEvent: 'leftRoom'})
    res.end()
}