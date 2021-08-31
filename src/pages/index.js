// server
import store from 'store-js'
import pusherInit from '../pusher/init'

//client
import {useState, useContext, useEffect} from 'react'
import Pusher from 'pusher-js'

import Login from '../components/login/login'
import Lobby from '../components/lobby/lobby'
import LobbyHeader from '../components/lobby/Header'

import {RouteContext} from '../contexts/routeContext'
import { InfoContext } from '../contexts/infoContext'
import { PusherContext } from '../contexts/pusherContext'

import globalFetch from '../functions/globalFetch'



export async function getServerSideProps(ctx) {
  const users = store.get('users')
  if(!(ctx.res.socket.server.pusher && users)) {
    ctx.res.socket.server.pusher = pusherInit()
  }
  const {cookie} = ctx.req.headers
  
  const username = cookie?.split(';').find(row => row.startsWith('username='))?.split('=')[1]
  const {PUSHER_APP_CLUSTER, PUSHER_APP_KEY} = process.env
  const redirectLogin = {
    props: {
      env: {
        PUSHER_APP_CLUSTER, 
        PUSHER_APP_KEY
      },
      route: {name: 'login'}
    }
  }

  if(username===undefined || username === '' || username==='undefined') {
    return redirectLogin
  }

  try {
    
    if(users?.username?.includes(username)) {
      return redirectLogin
    } else {
      
      return {
        props: {
          env: {
            PUSHER_APP_CLUSTER, 
            PUSHER_APP_KEY
          },
          route: {name: 'lobby'},
          username
        }
      }

    }
  }

  catch(err) {
    return redirectLogin
  }
}

export default function Home({route: routeX, username='', env={}}) {
  const [route, setRoute] = useState({name: routeX.name})
  const {setData} = useContext(InfoContext)

  const [socketId, setSocketId] = useState('')
  const [personalChannel, setPersonalChannel] = useState()

  const {PUSHER_APP_CLUSTER, PUSHER_APP_KEY} = env
  
  const pusher = new Pusher(PUSHER_APP_KEY, {
      cluster: PUSHER_APP_CLUSTER,
      encrypted: true
  });

  
  useEffect(() => {
      
      try {
          pusher.connection.bind('connected', () => {
              const {socket_id} = pusher.connection
              setPersonalChannel(pusher.subscribe(socket_id))
              const disconnect = async (e) => {
                  await globalFetch({path: 'api/pusher/disconnect', socketId: socket_id})
              }
              window.removeEventListener('beforeunload', disconnect)
              window.addEventListener('beforeunload', disconnect)
              console.log('Pusher Connected!', socket_id)
              setSocketId(socket_id)
          })
      }
      catch(err) {
          console.log(err)
      }
      return ()=>{
          pusher.disconnect()
      }
  }, [setSocketId])

  useEffect(() => {
    if(username!=='' && socketId !=='') {
      setData(d => {
        const obj = {...d}
        obj.name = username
        return obj
      });
      (async ()=> {
        await globalFetch({path: '/api/login', socketId, body: {check: false, username}})
      })();
    }
  }, [setData, socketId])
  return (
    <PusherContext.Provider value={{pusher, socketId, personalChannel}}>
      <RouteContext.Provider value={{setRoute}}>
        {
          route.name !== 'login' ?
            <>
              <LobbyHeader />
              <Lobby />
            </>
          : <Login />
        }
      </RouteContext.Provider>
    </PusherContext.Provider>
  )
}
