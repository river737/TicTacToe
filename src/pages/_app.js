import '../../styles/globals.css'
import InfoProvider from '../contexts/infoContext'
import AlertContextProvider from '../contexts/alertContext'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <InfoProvider>
        <AlertContextProvider>
          <div className='container'>
            <Component {...pageProps} />
          </div>
        </AlertContextProvider>
      </InfoProvider>
    </>
  )
}

export default MyApp
