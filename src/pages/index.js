import {useState, useContext, useEffect} from 'react'

import Login from '../components/login/login'
import Lobby from '../components/lobby/Lobby'
import LobbyHeader from '../components/lobby/Header'
import Game from '../components/game/game'

import { InfoContext } from '../contexts/infoContext'
import { SocketContext } from '../contexts/socketContext'
import {RouteContext} from '../contexts/routeContext'

export async function getServerSideProps(ctx) {
  const {req} = ctx
  const {cookie} = req.headers
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
    const {res} = ctx
    const {users} = res.socket.server.io.data
    if(users.username.includes(username)) {
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

export default function Home({route: routeX, username}) {
  const {setData} = useContext(InfoContext)
  const {socket} = useContext(SocketContext)
  const [route, setRoute] = useState({name: routeX.name})
  
  useEffect(()=>{
    let mounted = true
    if(username) {
      socket.emit('submit_username', {username, type: 'previous user'})
      if(mounted)
      setData(obj => {
        const objx = {...obj}
        objx.name = username
        return objx
      })
    }
    return () => {
      mounted = false
      socket.off('submit_username')
    }
  }, [setData, username, socket])
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
