import store from 'store-js'
import { storeObject }from '../../../store/storeFunctions'

export default function handler(req, res) {
    if(req.method==="POST") {
        const {socketId} = req.body
        const users = store.get('users')
        
        const user = users[socketId]
        if(user) {
            const {activeRoom} = user
            if(activeRoom) {
                
            }
            storeObject.delete({name: 'users', keys: [socketId]})
        }
    }
    res.end()
}