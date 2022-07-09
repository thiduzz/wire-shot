import type { NextPage } from "next";
import Layout from "@components/Layout";
import React, { useCallback, useEffect, useState } from "react";
import Head from "@components/Head";
import {
  IoRestaurantOutline,
  IoQrCodeOutline,
  IoPencil,
} from "react-icons/io5";
import { useRouter } from "next/router";
import Link from "next/link";
import { useProfile } from "@context/profile";

const Home: NextPage = () => {
  const [currentProfileAddress, setCurrentProfileAddress] =
    useState<string | null>(null);
  const { profile, connectWallet } = useProfile();

  const handleConnectWallet = useCallback(async () => {
    connectWallet();
  }, [connectWallet]);

  useEffect(() => {
    if (profile) {
      setCurrentProfileAddress(profile.address);
      return;
    }
    setCurrentProfileAddress(null);
  }, [profile?.address]);

  return (
    <Layout>
      <Head
        title="Wireshot - Homepage"
        description="Your Restaurant Payment solution"
      />
      <div className="page-content justify-center">
        <div className="hero flex flex-col items-center justify-center">
          {currentProfileAddress && (
            <div className="flex flex-col items-center">
              <div className="mb-10">
                <h1 className="text-5xl text-purple-400 mb-2 text-center">
                  You are connected!
                </h1>
                <div>
                  Connected as{" "}
                  <span className="text-purple-400 font-bold text-center">
                    {currentProfileAddress}
                  </span>
                </div>
              </div>
              <div className="flex flex-row items-center gap-x-3.5">
                <Link href="/restaurant" passHref>
                  <div className="cursor-pointer hover:scale-125 transition-transform bg-white p-10 rounded border border-purple-400 shadow-lg w-48 h-48 flex flex-col text-center items-center justify-start leading-tight">
                    <IoRestaurantOutline
                      size={50}
                      className="text-purple-400 mb-5"
                    />
                    Restaurant Management
                  </div>
                </Link>
                <Link href="/customer" passHref>
                  <div className="cursor-pointer hover:scale-125 transition-transform bg-white p-10 rounded border border-purple-400 shadow-lg w-48 h-48 flex flex-col text-center items-center justify-start">
                    <IoQrCodeOutline
                      size={50}
                      className="text-purple-400 mb-5"
                    />
                    Guest
                  </div>
                </Link>
              </div>
              <div className="flex flex-row items-center justify-center pt-3.5">
                <Link href="/profile" passHref>
                  <div className="cursor-pointer hover:scale-125 transition-transform bg-white p-10 rounded border border-purple-400 shadow-lg w-full h-24 flex flex-row text-center items-center justify-center">
                    <IoPencil size={38} className="text-purple-400 mr-5" />
                    <div className="h-full">Change profile</div>
                  </div>
                </Link>
              </div>
            </div>
          )}
          {!currentProfileAddress && (
            <button
              className="bg-purple-400 text-white p-5 rounded-lg"
              onClick={handleConnectWallet}
            >
              Connect
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
