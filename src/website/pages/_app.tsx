import '@styles/globals.css'
import type { AppProps } from 'next/app'
import {useEffect} from "react";
import TagManager from "react-gtm-module"
import useConsent from "@hooks/useConsent";
import {ProfileProvider, useProfile} from "@context/profile";

function MyApp({ Component, pageProps }: AppProps) {
  const {klaro} = useConsent()
  useEffect(() => {
    TagManager.initialize({
      gtmId: process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID,
    })
  }, [klaro])

  return <ProfileProvider>
    <Component {...pageProps} />
  </ProfileProvider>
}

export default MyApp