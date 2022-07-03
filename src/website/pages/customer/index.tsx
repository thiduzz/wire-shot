import Head from "@components/Head";
import Layout from "@components/Layout";
import { useProfile } from "@context/profile";
import { useRestaurant } from "@context/restaurant";
import { userService } from "@hooks/useService";
import type { NextPage } from "next";
import Link from "next/link";
import React, { useEffect } from "react";
import { IoHomeOutline } from "react-icons/io5";

const CustomerIndex: NextPage = () => {
  // const pageSize = 2;
  // const [offset, setOffset] = useState(0);
  // const [hasMore, setHasMore] = useState(false);
  const { RestaurantService, SmartContractService } = userService("evm");
  const { restaurants, setRestaurants } = useRestaurant();
  const { profile } = useProfile();
  const spawnerAddress = process.env.NEXT_PUBLIC_SPAWNER_CONTRACT_ADDRESS ?? "";

  useEffect(() => {
    retrieveRestaurants();
  }, []);

  const retrieveRestaurants = async () => {
    if (profile)
      setRestaurants(
        await RestaurantService.getRestaurants(
          spawnerAddress,
          profile.address,
          SmartContractService.getProvider()
        )
      );
  };

  // const handleLoadRestaurants = useCallback(async () => {
  //   const provider = getProvider();
  //   if (provider && !isLoading) {
  //     setIsLoading(true);
  //     const spawnerContract = new ethers.Contract(
  //       spawnerAddress,
  //       RestaurantSpawnerAbi.abi,
  //       provider.getSigner()
  //     );
  //     const [addresses, newCursor] = await spawnerContract.paginateRestaurants(
  //       offset,
  //       pageSize + 1
  //     );
  //     let converterCursor = Math.round(
  //       parseFloat(ethers.utils.formatUnits(newCursor, 18)) * 10 ** 18
  //     );
  //     if (addresses) {
  //       const paginatedAddresses = [...addresses];
  //       if (paginatedAddresses.length > pageSize) {
  //         //has more
  //         setHasMore(true);
  //         paginatedAddresses.splice(-1, 1);
  //         --converterCursor;
  //       } else {
  //         setHasMore(false);
  //       }
  //       const arr: Array<any> = restaurants;
  //       for (const index in paginatedAddresses) {
  //         const restaurantContract = new ethers.Contract(
  //           paginatedAddresses[index],
  //           RestaurantAbi.abi,
  //           provider.getSigner()
  //         );
  //         const restaurantName = await restaurantContract.name();
  //         arr.push({
  //           address: paginatedAddresses[index],
  //           name: restaurantName,
  //         });
  //       }
  //       setRestaurants(arr);
  //       setOffset(converterCursor);
  //     }
  //     setIsLoading(false);
  //   }
  // }, [isLoading, offset]);

  return (
    <Layout isLoading={!restaurants || restaurants.length < 1}>
      <Head
        title="Wireshot - Restaurants List"
        description="Your Restaurant Payment solution"
      />
      <div className="page-content justify-center">
        <div className="hero flex flex-col items-center justify-center">
          {restaurants && restaurants.length > 0 && (
            <div className="flex flex-row flex-wrap justify-start gap-3.5">
              {restaurants.map((restaurant) => (
                <Link
                  key={restaurant.address}
                  href={"/customer/restaurant/" + restaurant.address}
                  passHref
                >
                  <div className="cursor-pointer hover:scale-125 transition-transform bg-white h-48 w-48 shadow-lg border-purple-400 border rounded-lg flex flex-col items-center justify-center">
                    <IoHomeOutline size={50} className="text-purple-400 mb-5" />
                    {restaurant.name}
                  </div>
                </Link>
              ))}
            </div>
          )}
          {/* {!isLoading && hasMore && (
            <button
              className="bg-purple-400 text-white px-5 py-2 rounded-lg mt-5"
              onClick={handlePaginate}
            >
              Load more
            </button>
          )} */}
        </div>
      </div>
    </Layout>
  );
};

export default CustomerIndex;
