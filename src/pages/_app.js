import '../../styles/globals.css'
import SocketContextProvider from '../contexts/socketContext'
import {InfoProvider} from '../components/form'
import {useEffect} from 'react'

function MyApp({ Component, pageProps }) {
  useEffect(()=>{
    document.cookie = 'username=;sameSite=Strict'
    return () => {
      document.cookie = 'username=;sameSite=Strict'
    }
  },[])
  return (
    <>
      <SocketContextProvider>
        <InfoProvider>
          <div className='container'>
            <Component {...pageProps} />
          </div>
        </InfoProvider>
      </SocketContextProvider>
    </>
  )
}

export default MyApp
