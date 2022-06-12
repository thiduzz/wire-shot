import type {NextPage} from 'next'
import Layout from "@components/Layout";
import React, {useCallback, useEffect, useState} from "react";
import Head from "@components/Head";
import {useEthers} from "@hooks/useEthers";
import {useProfile} from "@context/profile";
import {ethers} from "ethers";
import RestaurantSpawnerAbi from "@wireshot/hardhat/artifacts/contracts/RestaurantSpawner.sol/RestaurantSpawner.json"
import RestaurantAbi from "@wireshot/hardhat/artifacts/contracts/Restaurant.sol/Restaurant.json"
import Link from "next/link";
import {IoHomeOutline} from "react-icons/io5";

const RestaurantIndex: NextPage = () => {
    const {profile} = useProfile()

    const [restaurants, setRestaurants] = useState<Array<any>>([])
    const [newRestaurantName, setNewRestaurantName] = useState<string>('')
    const {getProvider} = useEthers()
    const spawnerAddress = process.env.NEXT_PUBLIC_SPAWNER_CONTRACT_ADDRESS ?? ''
    console.log("Spawner: " +spawnerAddress)
    const handleLoadRestaurants = useCallback(async () => {

        const provider = getProvider()
        if (provider) {
            const spawnerContract = new ethers.Contract(spawnerAddress, RestaurantSpawnerAbi.abi, provider.getSigner());
            const result = await spawnerContract.getRestaurants(profile?.address)
            if (result) {

                const arr: Array<any> = []
                for (const index in result) {
                    const restaurantContract = new ethers.Contract(result[index], RestaurantAbi.abi, provider.getSigner());
                    const restaurantName = await restaurantContract.name()
                    arr.push({address: result[index], name: restaurantName})
                }
                setRestaurants(arr)
            }
        }
    }, [])

    const handleCreateRestaurant = useCallback(async () => {
        if(newRestaurantName.length <= 0){
            debugger
            return
        }
        const provider = getProvider()
        if (provider) {

            try {
                const spawnerContract = new ethers.Contract(spawnerAddress, RestaurantSpawnerAbi.abi, provider.getSigner());
                const restaurantAddress = await spawnerContract.addRestaurant(newRestaurantName)
                console.log(restaurantAddress)
                setNewRestaurantName('')
            } catch (e) {
                console.log(e)
            }
        }
    }, [newRestaurantName])

    useEffect(() => {
        handleLoadRestaurants()
    }, [handleLoadRestaurants])

    const handleChangeName = useCallback((e) => {
        setNewRestaurantName(e.target.value)
    },[])

    return (
        <Layout>
            <Head title="Wireshot - Restaurant" description="Your Restaurant Payment solution"/>
            <div className="page-content justify-center">
                <div className="hero flex flex-col items-center justify-center">
                    {restaurants.length > 0 && <div className="flex flex-row flex-wrap justify-start gap-x-3.5">
                        {restaurants.map((restaurant) => <Link key={restaurant.address}
                                                               href={"/restaurant/" + restaurant.address} passHref>
                            <div className="cursor-pointer hover:scale-125 transition-transform bg-white h-48 w-48 shadow-lg border-purple-400 border rounded-lg flex flex-col items-center justify-center">
                                <IoHomeOutline  size={50} className="text-purple-400 mb-5"/>
                                {restaurant.name}
                            </div>
                        </Link>)}
                    </div>}
                    <div className="mt-10 flex flex-row items-center gap-x-3.5">
                        <input type="text" value={newRestaurantName} onChange={handleChangeName} className="w-64 border border-gray-300 rounded-lg focus:active:border-purple-400 px-3 py-3 active:border-purple-400"/>
                        <button className="bg-purple-400 text-white p-5 rounded-lg" onClick={handleCreateRestaurant}>Create
                            restaurant
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default RestaurantIndex