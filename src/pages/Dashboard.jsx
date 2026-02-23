import React from "react";
import { Box, Grid, Card, CardContent, Typography } from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import QrCodeIcon from "@mui/icons-material/QrCode";
import UrlForm from "../components/UrlForm";

const StatCard = ({ icon, title, value, extra }) => {
    return (
        <Card
            elevation={0}
            sx={{
                borderRadius: 3,
                border: "1px solid #e5e7eb",
                backgroundColor: "#ffffff",
            }}
        >
            <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Box sx={{display :"flex", justifyContent:"center", alignItems : "center"}}>
                        <Box
                            sx={{
                                backgroundColor: "#EEF2FF",
                                p: 1.5,
                                borderRadius: 33,
                                color: "#4F46E5",
                                marginRight : "10px"
                            }}
                        >
                            {icon}

                        </Box>
                        <Typography
                            variant="body2"
                            sx={{ color: "#19191a", mb: 1, fontSize:"17px", fontWeight:600 }}
                        >
                            {title}
                        </Typography>
                    </Box>


                    <Box>


                        <Typography variant="h5" fontWeight={800} fontSize={28}>
                            {value}
                        </Typography>

                        {extra && (
                            <Typography
                                variant="caption"
                                sx={{ color: "#10b981", fontWeight: 800 }}
                            >
                                {extra}
                            </Typography>
                        )}
                    </Box>


                </Box>
            </CardContent>
        </Card>
    );
};

const Dashboard = () => {
    return (
        <Box>
            {/* Stats Section */}

            <Grid container spacing={3} mb={2} sx={{ width: "100%" }}>
                <Grid item xs={12} md={12} lg={4} sx={{ width: "31.5%" }}>
                    <StatCard
                        icon={<LinkIcon />}
                        title="Total URLs"
                        value="245"
                    />
                </Grid>

                <Grid item xs={12} md={4} sx={{ width: "31.5%" }}>
                    <StatCard
                        icon={<TrendingUpIcon />}
                        title="Clicks Today"
                        value="78"
                        extra="+12%"
                    />
                </Grid>

                <Grid item xs={12} md={4} sx={{ width: "31.5%" }}>
                    <StatCard
                        icon={<QrCodeIcon />}
                        title="QR Codes"
                        value="36"
                    />
                </Grid>
            </Grid>

            {/* Create Short URL Section */}
            {/* <Card
                elevation={0}
                sx={{
                    height: "80vh",
                    // borderRadius: 4,
                    // border: "1px solid #e5e7eb",
                    // p: 3,
                    // backgroundColor: "#ffffff",
                }}
            > */}
                {/* 👇 Your Existing Component Goes Here */}
                <UrlForm />
            {/* </Card> */}
        </Box>
    );
};

export default Dashboard;