import '@styles/globals.css'
import type { AppProps } from 'next/app'
import {useEffect} from "react";
import TagManager from "react-gtm-module"
import useConsent from "@hooks/useConsent";

function MyApp({ Component, pageProps }: AppProps) {
  const {klaro} = useConsent()
  useEffect(() => {
    TagManager.initialize({
      gtmId: process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID,
    })
  }, [klaro])
  return <Component {...pageProps} />
}

export default MyApp