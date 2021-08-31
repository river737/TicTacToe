import '../../styles/globals.css'
import PusherContextProvider from '../contexts/pusherContext'
import InfoProvider from '../contexts/infoContext'
import AlertContextProvider from '../contexts/alertContext'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <PusherContextProvider>
        <InfoProvider>
          <AlertContextProvider>
            <div className='container'>
              <Component {...pageProps} />
            </div>
          </AlertContextProvider>
        </InfoProvider>
      </PusherContextProvider>
    </>
  )
}

export default MyApp
