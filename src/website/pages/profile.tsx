import type {NextPage} from 'next'
import Layout from "@components/Layout";
import React, {useCallback, useEffect} from "react";
import Head from "@components/Head";
import {useEthers} from "@hooks/useEthers";
import {useRouter} from "next/router";
import {useProfile} from "@context/profile";


const Profile: NextPage = () => {
    const { profile } = useProfile()


  return (
      <Layout>
        <Head title="Wireshot - Profile" description="Your Restaurant Payment solution"/>
        <div className="page-content justify-center">
          <div className="hero flex flex-col items-center justify-center">
              <h1>Profile Index</h1>
              { profile ? <>
                  Connected as <span className="text-purple-400 font-bold">{profile.address}</span>
              </> : "Not connected"}
          </div>
        </div>
      </Layout>
  )
}

export default Profile