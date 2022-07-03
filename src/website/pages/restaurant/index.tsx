import Head from "@components/Head";
import Layout from "@components/Layout";
import { useProfile } from "@context/profile";
import { useRestaurant } from "@context/restaurant";
import { userService } from "@hooks/useService";
import type { NextPage } from "next";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { IoHomeOutline } from "react-icons/io5";

const RestaurantIndex: NextPage = () => {
  const { profile } = useProfile();
  const { restaurants, setRestaurants } = useRestaurant();
  const { RestaurantService, SmartContractService } = userService("evm");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [newRestaurantName, setNewRestaurantName] = useState<string>("");

  const spawnerAddress = process.env.NEXT_PUBLIC_SPAWNER_CONTRACT_ADDRESS ?? "";

  useEffect(() => {
    retrieveRestaurants();
  }, [profile]);

  useEffect(() => {
    if (restaurants && restaurants.length > 0) setIsLoading(false);
  }, [restaurants]);

  const retrieveRestaurants = async () => {
    if (profile) {
      const fetchedRestaurants = await RestaurantService.getRestaurants(
        spawnerAddress,
        profile.address,
        SmartContractService.getProvider()
      );
      if (fetchedRestaurants && fetchedRestaurants.length > 0)
        setRestaurants(fetchedRestaurants);
      else setIsLoading(false);
    }
  };

  const handleCreateRestaurant = async (): Promise<void> => {
    if (newRestaurantName.length <= 0) {
      return;
    }
    const response = await RestaurantService.addRestaurant(
      spawnerAddress,
      newRestaurantName,
      SmartContractService.getProvider()
    );
    if (response) setNewRestaurantName("");
  };

  const handleChangeName = useCallback((e) => {
    setNewRestaurantName(e.target.value);
  }, []);

  return (
    <Layout isLoading={isLoading}>
      <Head
        title="Wireshot - Restaurant"
        description="Your Restaurant Payment solution"
      />
      <div className="page-content justify-center">
        <div className="hero flex flex-col items-center justify-center">
          {restaurants && restaurants.length > 0 && (
            <div className="flex flex-row flex-wrap justify-start gap-3.5">
              {restaurants.map((restaurant) => (
                <Link
                  key={restaurant.address}
                  href={"/restaurant/" + restaurant.address}
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
          <div className="mt-10 flex flex-row items-center gap-x-3.5">
            <input
              type="text"
              value={newRestaurantName}
              onChange={handleChangeName}
              className="w-64 border border-gray-300 rounded-lg focus:active:border-purple-400 px-3 py-3 active:border-purple-400"
            />
            <button
              className="bg-purple-400 text-white p-5 rounded-lg"
              onClick={handleCreateRestaurant}
            >
              Create restaurant
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RestaurantIndex;
