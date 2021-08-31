// Next.js API route support: https://nextjs.org/docs/api-routes/introduction


import store from 'store-js'
import Pusher from 'pusher'

export default function pusherInit() {
    const pusher = new Pusher({
      appId: process.env.PUSHER_APP_ID,
      key: process.env.PUSHER_APP_KEY,
      secret: process.env.PUSHER_APP_SECRET,
      cluster: process.env.PUSHER_APP_CLUSTER,
      useTLS: true
    });

    console.log("pusher initialized")


    store.set('users', {})
    store.set('rooms', {})

    return pusher
}

/*
    users: {
        "socketId": {
            username: "",
            activeRoom: {
                id: '',
                opponent: {
                    id: ''
                }
            }
        }
    }
*/

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
