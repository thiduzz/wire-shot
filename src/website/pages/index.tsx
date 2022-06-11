import type {NextPage} from 'next'
import Layout from "@components/Layout";
import React from "react";
import Head from "@components/Head";


const Home: NextPage = () => {

  return (
      <Layout>
        <Head title="Wireshot - Homepage" description="Your Restaurant Payment solution"/>
        <div className="page-content justify-center">
          <div className="hero flex flex-col items-center justify-center">
              Heyo!
          </div>
        </div>

      </Layout>
  )
}

export default Home