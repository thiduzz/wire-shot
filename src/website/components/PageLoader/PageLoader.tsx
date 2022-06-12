import React, {useEffect} from 'react'
import {useProfile} from "@context/profile";


const PageLoader = ({ children }) => {
    const {loading, loadWallet} = useProfile()

    useEffect(() => {
        loadWallet()
    },[])

    return !loading && children
}

export default PageLoader