import { useEffect, useState } from 'react'
import config from '@libs/KlaroConsentManager'

const useConsent = () => {
    const [klaro, setKlaro] = useState<any|null>(null)

    const loadKlaro = async () => {
        if (typeof window !== "undefined") {
            const Klaro = await import ("klaro/dist/klaro-no-css")
            window.klaro = Klaro;
            window.klaroConfig = config;
            Klaro.setup(config);
            setKlaro(Klaro)
        }
    }
    useEffect(() => {
        loadKlaro()
    }, [])

    return { klaro }
}
export default useConsent