import '../../styles/globals.css'
import SocketContextProvider from '../contexts/socketContext'
import {InfoProvider} from '../components/form'


function MyApp({ Component, pageProps }) {
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
