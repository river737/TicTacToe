import '../../styles/globals.css'
import Header from '../../components/header.js'
import Footer from '../../components/footer.js'
import SocketContextProvider from '../contexts/socketContext'


function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <SocketContextProvider>
        <Component {...pageProps} />
      </SocketContextProvider>
      <Footer />
    </>
  )
}

export default MyApp
