import {createContext, ReactNode, useCallback, useContext, useEffect, useState, useMemo} from 'react';
import {IProfile} from "@local-types/profile";
import {useEthers} from "@hooks/useEthers";

interface IProfileContext {
    profile: IProfile | null
    updateProfile: (profile: IProfile) => void
    connectWallet: () => void
    disconnectWallet: () => void
    loadWallet: () => void
}

const throwMissingProvider: () => void = () => {
    throw new Error('The ContextProvider is missing!')
}

const initialState: IProfileContext = {
    updateProfile: throwMissingProvider,
    connectWallet: throwMissingProvider,
    disconnectWallet: throwMissingProvider,
    loadWallet: throwMissingProvider,
    profile: null,
}

export const ProfileContext = createContext<IProfileContext>(initialState);

export const ProfileProvider = ({children}: { children?: ReactNode }) => {
    const [profile, setProfile] = useState<IProfile | null>(null);
    const {connectWallet, loadAlreadyAuthorizedWallet, disconnectWallet} = useEthers()

    const handleUpdateAccount = useCallback(async (account: string) => {
        if (profile) {
            setProfile({address: account, name: profile.name})
        } else {
            setProfile({address: account, name: ''})
        }
    }, [])

    const handleUpdateProfile = useCallback(async (profile: IProfile) => {

    }, [])

    const handleConnectWallet = useCallback(async () => {
        try {

            const account = await connectWallet()
            debugger;
            if (account) {
                setProfile({address: account, name: ''})
                return
            }
            setProfile(null)
        } catch (e) {
            console.log(e)
        }
    }, [connectWallet])

    const handleDisconnectWallet = useCallback(async () => {
        await disconnectWallet()
        setProfile(null)
    }, [disconnectWallet])


    const handleLoadExistingWallet = useCallback(async () => {
        const account = localStorage.getItem("wireshot_account")
        if (account) {
            const verifiedAccount = await loadAlreadyAuthorizedWallet([account], true)
            setProfile({address: verifiedAccount, name: ''})
        }
    }, [loadAlreadyAuthorizedWallet])

    useEffect(() => {
        const {ethereum} = window as any;
        if (!ethereum) {
            return;
        }
        window.ethereum.on('accountsChanged', handleUpdateAccount);
        window.ethereum.on('disconnect', handleDisconnectWallet);

        return () => {

            window.ethereum.removeListener('accountsChanged', handleUpdateAccount);
            window.ethereum.removeListener('disconnect', handleDisconnectWallet);
        }
    }, [])

    const state = useMemo(
        () => {
            return {
                profile,
                updateProfile: handleUpdateProfile,
                connectWallet: handleConnectWallet,
                disconnectWallet: handleDisconnectWallet,
                loadWallet: handleLoadExistingWallet
            }
        },
        [profile, handleUpdateProfile, handleConnectWallet, handleDisconnectWallet, handleLoadExistingWallet],
    )

    return <ProfileContext.Provider value={state}>{children}</ProfileContext.Provider>
}

export const useProfile = () => useContext(ProfileContext)