import store from 'store-js'
import { storeObject } from '../../store/storeFunctions'

export default function handle(req, res) {
    if(req.method!=='POST') res.end()
    else post(req, res)
}

function post(req, res) {
    let users = store.get('users')
    if(!users) users = 'undefined'
    let pusher = res?.socket?.server?.pusher ? 'ok' : 'undefined'
    
    const obj = {{success: true, data: {users, pusher}}}
    

    res.json(obj)

    // const {socketId, data} = req.body
    // const {username, check} = data
    // const success = () => {
    //     storeObject.update({name: 'users', value: {username}, keys: [socketId]})
    //     res?.setHeader('Set-Cookie',`username=${username}; path=/; Max-Age=86400; HttpOnly, SameSite=Strict`);

    //     res.json({success: true})
    // }
    // if(check) {
    //     if(Object.keys(users).filter(id => users[id].username === username).length === 0) {
    //         success()
    //     } else {
    //         res.json({success: false, error: {msg: "Username is taken"}})
    //     }
    // } else {
    //     success()
    // }
}