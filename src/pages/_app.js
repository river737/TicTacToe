import '../../styles/globals.css'
import Header from '../../components/header.js'
import Footer from '../../components/footer.js'
import SocketContextProvider from '../contexts/socketContext'
import {NameProvider} from '../../components/form.js'


function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <SocketContextProvider>
        <NameProvider>
          <Component {...pageProps} />
        </NameProvider>
      </SocketContextProvider>
      <Footer />
    </>
  )
}

export default MyApp
