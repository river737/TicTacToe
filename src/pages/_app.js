import '../../styles/globals.css'

import SocketContextProvider from '../contexts/socketContext'


function MyApp({ Component, pageProps }) {
  return (
    <SocketContextProvider>
      <Component {...pageProps} />
    </SocketContextProvider>
  )
}

export default MyApp
