// layouts/PublicLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { Box } from "@mui/material";
import dashboard from "../assets/dashboard.png";
import Footer from "../components/Footer";
import Features from "../components/Features";

const PublicLayout = () => {
    return (
        <>
            <Box sx={{
                // display: "flex",
                minHeight: "100vh",
                backgroundImage: `url(${dashboard})`,
                backgroundSize: "cover",        // fills entire screen
                backgroundRepeat: "no-repeat",  // prevents tiling
                backgroundPosition: "center",   // keeps image centered
                paddingBottom:"100px"
            }}>
                <Header />
                <Outlet />  
                <Features />              

            </Box>
            <Footer />

        </>
    );
};

export default PublicLayout;