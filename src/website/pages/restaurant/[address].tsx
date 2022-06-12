import type {NextPage} from 'next'
import Layout from "@components/Layout";
import React, {useCallback, useEffect, useState} from "react";
import Head from "@components/Head";
import {useEthers} from "@hooks/useEthers";
import {ethers} from "ethers";
import RestaurantAbi from "@wireshot/hardhat/artifacts/contracts/Restaurant.sol/Restaurant.json"
import {IoEllipseOutline} from "react-icons/io5";
import {useRouter} from "next/router";

enum TableStatus {
    Busy,
    Free,
    Closed
}

interface ITable {
    name: string;
    address: string;
    status: TableStatus;
}

interface IRestaurant {
    name: string;
    tables: Array<ITable>;
}

const Restaurant: NextPage = () => {
    const router = useRouter()

    const [restaurant, setRestaurant] = useState<IRestaurant | null>(null)
    const {getProvider} = useEthers()
    const handleLoadRestaurant = useCallback(async () => {

        const provider = getProvider()
        if (provider) {
            const { address } = router.query
            if (address){
                if (typeof address === "string") {
                    const restaurantContract = new ethers.Contract(address, RestaurantAbi.abi, provider.getSigner());
                    const restaurantName = await restaurantContract.name()
                    setRestaurant({name: restaurantName, tables: []})
                }
            }
        }
    }, [])

    const handleCreateTable = useCallback(async () => {

        const provider = getProvider()
        if (provider) {

            try {
                const { address } = router.query
                console.log(address)
                if (address){
                    const restaurantContract = new ethers.Contract(address[0], RestaurantAbi.abi, provider.getSigner());
                    const restaurantName = await restaurantContract.name()
                    setRestaurant({name: restaurantName, tables: []})
                }
            } catch (e) {
                console.log(e)
            }
        }
    }, [])

    useEffect(() => {
        handleLoadRestaurant()
    }, [handleLoadRestaurant])

    return (
        <Layout>
            <Head title="Wireshot - Restaurant" description="Your Restaurant Payment solution"/>
            <div className="page-content justify-center">
                <div className="hero flex flex-col items-center justify-center">
                    {!restaurant && <span>Loading...</span>}
                    {restaurant && <div>
                        <h1>Restaurant: {restaurant.name}</h1>
                        {restaurant.tables.length > 0 && <div className="flex flex-row flex-wrap justify-start">
                                {restaurant.tables.map((table) => <div className="cursor-pointer hover:scale-125 transition-transform bg-white h-48 w-48 shadow-lg border-purple-400 border rounded-lg flex flex-col items-center justify-center">
                                    {table.status == TableStatus.Free && <IoEllipseOutline  size={50} className="text-purple-400 mb-5"/>}
                                    {table.status == TableStatus.Busy && <IoEllipseOutline  size={50} className="text-red-400 mb-5"/>}
                                    {table.status == TableStatus.Closed && <IoEllipseOutline  size={50} className="text-green-400 mb-5"/>}
                                    {table.name}
                                </div>)}
                        </div>}
                        {restaurant.tables.length <= 0 && <span>No tables defined...</span>}
                    </div>}
                </div>
            </div>
        </Layout>
    )
}

export default Restaurant