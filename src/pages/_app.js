import '../../styles/globals.css'
import Header from '../../components/header.js'
import Footer from '../../components/footer.js'
import SocketContextProvider from '../contexts/socketContext'
import {InfoProvider} from '../../components/form'


function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <SocketContextProvider>
        <InfoProvider>
          <Component {...pageProps} />
        </InfoProvider>
      </SocketContextProvider>
      <Footer />
    </>
  )
}

export default MyApp
