import type {NextPage} from 'next'
import Layout from "@components/Layout";
import React, {useCallback, useEffect, useState} from "react";
import Head from "@components/Head";
import {useEthers} from "@hooks/useEthers";
import {useProfile} from "@context/profile";
import {ethers} from "ethers";
import RestaurantAbi from "@wireshot/hardhat/artifacts/contracts/RestaurantSpawner.sol/RestaurantSpawner.json"


const RestaurantIndex: NextPage = () => {
    const [restaurants, setRestaurants] = useState<Array<any>>([])
    const {profile} = useProfile()
    const {getProvider} = useEthers()
    const spawnerAddress = process.env.NEXT_PUBLIC_SPAWNER_CONTRACT_ADDRESS ?? ''

    const handleLoadRestaurants = useCallback(async () => {

        const provider = getProvider()
        if(provider){
            debugger
            const spawnerContract = new ethers.Contract(spawnerAddress, RestaurantAbi.abi, provider.getSigner());
            const result = await spawnerContract.getRestaurants(profile?.address)
            console.log("result: " + JSON.stringify(result))
            if(result){
                setRestaurants(result)
            }
        }
    },[])

    const handleCreateRestaurant = useCallback(async () => {

        const provider = getProvider()
        if(provider){

            try{
                const spawnerContract = new ethers.Contract(spawnerAddress, RestaurantAbi.abi, provider.getSigner());
                const restaurantAddress = await spawnerContract.addRestaurant("hello")
                console.log(restaurantAddress)
            }catch (e){
                console.log(e)
            }
        }
    },[])

    useEffect(() => {
        handleLoadRestaurants()
    },[handleLoadRestaurants])

    return (
        <Layout>
            <Head title="Wireshot - Restaurant" description="Your Restaurant Payment solution"/>
            <div className="page-content justify-center">
                <div className="hero flex flex-col items-center justify-center">
                    <h1>Restaurant Index</h1>
                    {restaurants.length > 0 && <div>
                        {restaurants.map((restaurant) => <div>{JSON.stringify(restaurant) }</div>)}
                    </div>}
                    <button className="bg-purple-400 text-white p-5 rounded-lg" onClick={handleCreateRestaurant}>Create restaurant</button>
                    {profile ? <>
                        Connected as <span className="text-purple-400 font-bold">{profile.address}</span>
                    </> : "Not connected"}
                </div>
            </div>
        </Layout>
    )
}

export default RestaurantIndex