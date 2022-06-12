import {createContext, ReactNode, useCallback, useContext, useEffect, useState, useMemo} from 'react';
import {IProfile} from "@local-types/profile";
import {useEthers} from "@hooks/useEthers";
import {useRouter} from "next/router";
import {debug} from "util";

interface IProfileContext {
    loading: boolean
    profile: IProfile | null
    updateProfile: (profile: IProfile) => void
    connectWallet: () => void
    loadWallet: () => void
}

const throwMissingProvider: () => void = () => {
    throw new Error('The ContextProvider is missing!')
}

const initialState: IProfileContext = {
    updateProfile: throwMissingProvider,
    connectWallet: throwMissingProvider,
    loadWallet: throwMissingProvider,
    profile: null,
    loading: true,
}

export const ProfileContext = createContext<IProfileContext>(initialState);

export const ProfileProvider = ({children}: { children?: ReactNode }) => {
    const [profile, setProfile] = useState<IProfile | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const {connectWallet, loadAlreadyAuthorizedWallet} = useEthers()

    const handleUpdateAccount = useCallback(async (account) => {

        if(account.length <= 0){
            setProfile(null)
            sessionStorage.removeItem("wireshot_account")
        }else{
            if (profile) {
                setProfile({address: account, name: profile.name})
            } else {
                setProfile({address: account, name: ''})
            }
        }
    }, [])

    const handleUpdateProfile = useCallback(async (profile: IProfile) => {

    }, [])

    const handleConnectWallet = useCallback(async () => {
        try {
            const account = await connectWallet()
            if (account) {
                setProfile({address: account, name: ''})
                sessionStorage.setItem("wireshot_account", account)
                return
            }
            setProfile(null)
        } catch (e) {
            console.log(e)
        }
    }, [connectWallet])



    const handleLoadExistingWallet = useCallback(async () => {
        if(loading){

            const account = sessionStorage.getItem("wireshot_account")
            if (account) {
                const verifiedAccount = await loadAlreadyAuthorizedWallet([account], true)
                setProfile({address: verifiedAccount, name: ''})
            }
            setLoading(false)
        }
    }, [loading])

    useEffect(() => {
        const {ethereum} = window as any;
        if (!ethereum) {
            return;
        }
        window.ethereum.on('accountsChanged', handleUpdateAccount);

        return () => {
            window.ethereum.removeListener('accountsChanged', handleUpdateAccount);
        }
    }, [])

    const state = useMemo(
        () => {
            return {
                profile,
                loading,
                updateProfile: handleUpdateProfile,
                connectWallet: handleConnectWallet,
                loadWallet: handleLoadExistingWallet
            }
        },
        [profile, handleUpdateProfile, handleConnectWallet, handleLoadExistingWallet],
    )

    return <ProfileContext.Provider value={state}>{children}</ProfileContext.Provider>
}

export const useProfile = () => useContext(ProfileContext)