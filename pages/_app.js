import '../styles/globals.css'
import Head from 'components/head'
import 'toastify-js/src/toastify.css'

function App ({ Component, pageProps }) {
  return (
    <>
      <Head />
      <Component {...pageProps} />
    </>
  )
}

export default App
