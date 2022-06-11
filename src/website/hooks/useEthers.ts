import {ethers} from "ethers";
import {useEffect} from "react";

export const useEthers = () => {

    const getProvider = (): null | ethers.providers.Web3Provider => {
        const {ethereum} = window as any;
        if (!ethereum) {
            return null;
        }

        return new ethers.providers.Web3Provider(window.ethereum)
    }

    const getSigner = (): void | ethers.providers.JsonRpcSigner => {
        const provider = getProvider()
        if (provider) {
            return provider.getSigner();
        } else {
            console.log("No ethereum object!");
        }
    };

    const connectWallet = async () => {
        const provider = getProvider()
        if (!provider) {
            throw Error("failed to retrieve provider")
        }
        const accounts = await provider.send("eth_requestAccounts", []);
        if(accounts.length > 0){
            return accounts[0]
        }
        throw Error("failed to get accounts")
    };

    const disconnectWallet = async () => {
        const provider  = getProvider()
        if(!provider){
            throw Error("failed to retrieve provider")
        }
        //TODO: do something here
    };

    // const getConnectedWallet = async (): Promise<string | null> => {
    //     try {
    //         const provider  = getProvider()
    //         if(!provider){
    //             throw Error("failed to retrieve provider")
    //         }
    //         // Check if we are authorized to access the user's wallet
    //         const accounts = await provider.send("eth_accounts",[]);
    //         if (accounts.length !== 0) {
    //             return loadAlreadyAuthorizedWallet(accounts)
    //         }
    //         return null;
    //     } catch (error) {
    //         console.log(error);
    //         return null;
    //     }
    // };

    const loadAlreadyAuthorizedWallet = async (accounts, checkAuthorization = false) => {
        const account = accounts[0];
        if(account){
            if(checkAuthorization){
                const provider = getProvider()
                if(provider){

                    const requestedAccounts = await provider.send("eth_requestAccounts", []);
                    if(requestedAccounts.length > 0 && requestedAccounts[0] === account) {
                        return account
                    }
                }
            }else{
                return account
            }
        }
        return null
    };

    return {
        connectWallet,
        disconnectWallet,
        loadAlreadyAuthorizedWallet,
        getSigner,
        getProvider
    };
};