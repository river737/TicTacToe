import {parse} from 'querystring'
import store from 'store-js'

import globalLeaveRoom from '../../../pusher/game/globalLeaveRoom'

export default function handle(req, res) {
    if(req.method==="POST") {
        post(req, res)
    } else {
        res.end()
    }
}

function post(req, res) {
    const {type} = parse(req.url.split('?')[1])
    switch(type) {
        case 'placeMark': 
            placeMark(req, res)
            break;
        case 'restartRequest':
            restartRequest(req, res)
            break;
        case 'restartResponse':
            restartResponse(req, res)
            break;
        case 'quitGame':
            quitGame(req, res)
            break;
        default: 
            res.end()
            break;
    }
}

function placeMark(req, res) {
    const {socketId, data} = req.body
    const {activeRoom} = store.get('users')[socketId]

    if(activeRoom) {
        const {opponent} = activeRoom
        
        if(opponent?.id) {
            const {pusher} = res.socket.server
            const {pos} = data
            if(pos) {
                const {i, j} = pos
                if(i!==undefined && j !==undefined) {
                    pusher.trigger(opponent.id, 'placeMark', {pos: {i, j}})
                }
            }
        }
    }

    res.end()
}

function restartRequest(req, res) {
    const {socketId} = req.body
    const {activeRoom} = store.get('users')[socketId]

    if(activeRoom) {
        const {opponent} = activeRoom
        
        if(opponent?.id) {
            const {pusher} = res.socket.server
            pusher.trigger(opponent.id, 'restartRequest', {})
        }
    }
    res.end()
}

function restartResponse(req, res) {
    const {socketId, data} = req.body
    const {activeRoom} = store.get('users')[socketId]

    if(activeRoom) {
        const {opponent} = activeRoom
        
        if(opponent?.id) {
            const {pusher} = res.socket.server
            pusher.trigger(opponent.id, 'restartResponse', {success: data.success})
        }
    }
    res.end()
}

function quitGame(req, res) {
    const {socketId} = req.body
    const {pusher} = res.socket.server
    globalLeaveRoom({socketId, pusher, pusherEvent: 'quitGame'})
    res.end()
}