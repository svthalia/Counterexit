import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"

function MyApp({ Component,
                 pageProps: { session, ...pageProps }, }: AppProps) {

  return(
  // Avoids flickering/session loading on first load.
  <SessionProvider session={session} refetchInterval={5 * 60}>
    <Component {...pageProps} />
  </SessionProvider>)
}

export default MyApp
