import React from "react";
import TopBar from "@components/TopBar";
import Footer from "@components/Footer";
import { LayoutProps } from "./Layout.types";

const Layout = ({ children, topBar, footer, isLoading }: LayoutProps) => {
  return (
    <>
      <div className="base-container">
        {topBar ?? <TopBar />}
        <main className="base-main my-8">
          {isLoading ? (
            <div className="page-content justify-center">Is loading...</div>
          ) : (
            children
          )}
        </main>
        {}
        {footer ?? <Footer />}
      </div>
    </>
  );
};

export default Layout;
