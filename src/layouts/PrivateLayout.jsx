import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import dashboard from "../assets/dashboard.png";

const PrivateLayout = () => {
    return (
        <Box
            sx={{
                display: "flex",
                minHeight: "100vh",
                backgroundImage: `url(${dashboard})`,
                backgroundSize: "cover",        // fills entire screen
                backgroundRepeat: "no-repeat",  // prevents tiling
                backgroundPosition: "center",   // keeps image centered
            }}
        >
            <Sidebar />

            <Box sx={{ flexGrow: 1 }}>
                <Header />
                <Box sx={{ p: 4 }}>
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
};

export default PrivateLayout;