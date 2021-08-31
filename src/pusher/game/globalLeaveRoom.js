import store from 'store-js'
import { storeObject } from '../../store/storeFunctions'

export default function globalLeaveRoom({pusher, socketId, pusherEvent='' || 'leftRoom' || 'quitGame'}) {
    const users = store.get('users')
    const user = users[socketId]
    const {activeRoom} = user

    if(activeRoom) {
        const {id, opponent={}} = activeRoom
        const rooms = store.get('rooms')
        const room = rooms[id]
        if(room) {
            const {players = {}} = room
            const playersID = Object.keys(players)
            if(playersID.length > 1) {
                if(opponent?.id) {
                    // notify opponent
                    pusher.trigger(opponent.id, pusherEvent, {})

                    //update opponent's activeRoom data
                    storeObject.delete({name: 'users', keys: [opponent.id, 'activeRoom', 'opponent']})
                }
                // delete player from room
                storeObject.delete({name: 'rooms', keys: [id, 'players', socketId]})

            } else { // only 1 player left in the room which is the current user
                // delete room
                storeObject.delete({name: 'rooms', keys: [id]})
            }
        }
        // delete activeRoom data
        storeObject.delete({name: 'users', keys: [socketId, 'activeRoom']})
    }
}