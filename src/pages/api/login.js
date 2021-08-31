import store from 'store-js'
import { storeObject } from '../../store/storeFunctions'

export default function handle(req, res) {
    if(req.method!=='POST') res.end()
    else post(req, res)
}

function post(req, res) {
    const users = store.get('users')
    console.log("users", users)
    res.json({success: true})

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