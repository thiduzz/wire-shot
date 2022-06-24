import React from "react";
import TopBar from "@components/TopBar";
import Footer from "@components/Footer";
import { LayoutProps } from "./Layout.types";

const Layout = ({ children, topBar, footer }: LayoutProps) => {
  return (
    <>
      <div className="base-container">
        {topBar ?? <TopBar />}
        <main className="base-main my-8">{children}</main>
        {footer ?? <Footer />}
      </div>
    </>
  );
};

export default Layout;
