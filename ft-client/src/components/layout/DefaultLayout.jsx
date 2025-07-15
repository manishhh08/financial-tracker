import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
  return (
    <>
      {/* navbar */}
      <Header />
      {/* content */}
      <main className="main">
        <Outlet />
      </main>
      {/* footer */}
      <Footer />
    </>
  );
};

export default DefaultLayout;
