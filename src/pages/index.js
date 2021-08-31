// server
import store from 'store-js'
import pusherInit from '../pusher/init'

//client
import {useState, useContext, useEffect} from 'react'

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
  const redirectLogin = {
    props: {
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

export default function Home({route: routeX, username=''}) {
  const [route, setRoute] = useState({name: routeX.name})
  const {socketId} = useContext(PusherContext)
  const {setData} = useContext(InfoContext)

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
  )
}
