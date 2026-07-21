import { Outlet } from "react-router-dom";
import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";

const MainLayout = () => {
    return (
        <>
            <NavBar />
            <Outlet />
            <Footer />
        </>
    );
};

export default MainLayout;