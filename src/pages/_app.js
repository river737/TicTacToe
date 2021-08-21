import '../../styles/globals.css'
import SocketContextProvider from '../contexts/socketContext'
import InfoProvider from '../contexts/infoContext'
import AlertContextProvider from '../contexts/alertContext'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <SocketContextProvider>
        <InfoProvider>
          <AlertContextProvider>
            <div className='container'>
              <Component {...pageProps} />
            </div>
          </AlertContextProvider>
        </InfoProvider>
      </SocketContextProvider>
    </>
  )
}

export default MyApp
