import React, { useState, useEffect } from "react";
import {
    Box,
    Card,
    CardContent,
    Typography,
    Grid,
    ToggleButton,
    ToggleButtonGroup,
    CircularProgress,
    List,
    ListItem,
    ListItemText,
    Divider,
    Tooltip
} from "@mui/material";
import dashboard from "../assets/dashboard.png";
import { fetchAnalytics } from "../redux/slices/analyticSlice.js";


import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip as RechartTooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    CartesianGrid,
} from "recharts";

import { useDispatch, useSelector } from "react-redux";

const AnalyticsPage = () => {
    const glassCard = {
        background: "rgba(255, 255, 255, 0.75)",
        backdropFilter: "blur(10px)",
        borderRadius: "20px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
        padding: 1,
    };
    const {
        clickTrend,
        topLinks,
        recentActivity,
        mostClickedLink,
        loading,
    } = useSelector((state) => state.analytics);

    const [view, setView] = useState("daily");
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAnalytics());
    }, [dispatch]);


    const handleChange = (event, newView) => {
        if (newView) setView(newView);
    };

    if (loading) {
        return (
            <Box textAlign="center" mt={5}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box
            sx={{
                minHeight: "100vh",
                p: 4,
                //   backgroundImage: `url(${dashboard})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backdropFilter: "blur(4px)",
            }}
        >
            <Typography
                variant="h4"
                gutterBottom
                sx={{
                    fontWeight: 600,
                    color: "#1e3a5f",
                    mb: 4,
                }}
            >
                Analytics Dashboard
            </Typography>

            <Grid container spacing={3}>
                {/* Click Trend */}
                <Grid item xs={12} md={8}>
                    <Card sx={glassCard}>
                        <CardContent>
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                mb={2}
                            >
                                <Typography variant="h6">Click Trend</Typography>

                                <ToggleButtonGroup
                                    value={view}
                                    exclusive
                                    onChange={handleChange}
                                    size="small"
                                >
                                    <ToggleButton value="daily">Daily</ToggleButton>
                                    <ToggleButton value="weekly">Weekly</ToggleButton>
                                </ToggleButtonGroup>
                            </Box>

                            <ResponsiveContainer width="100%" height={260}>
                                <LineChart data={clickTrend?.[view]}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <RechartTooltip />
                                    <Line
                                        type="monotone"
                                        dataKey="clicks"
                                        stroke="#4fa3ff"
                                        strokeWidth={3}
                                        dot={{ r: 4 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </Grid>
                {/* Recent Activity */}
                <Grid item xs={12} md={6} >
                    <Card sx={glassCard}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Recent Click Activity
                            </Typography>

                            <List sx={{height : "260px"}}>
                                {recentActivity?.slice(0, 4).map((activity, index) => (
                                    <React.Fragment key={index}>
                                        <ListItem >
                                            <ListItemText
                                                primary={`https://miniurl-backend.onrender.com/${activity.shortUrl}`}
                                                secondary={new Date(activity.timestamp).toLocaleString()}
                                            />
                                        </ListItem>
                                        {index !== 3 && <Divider />}
                                    </React.Fragment>
                                ))}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Top Performing */}
                <Grid item xs={12} md={6} sx={{height : "290px"}}>
                    <Card sx={glassCard} >
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Top Performing Links
                            </Typography>

                            <ResponsiveContainer width="100%" height={220}>
                                <BarChart data={topLinks}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="shortUrl" hide />
                                    <YAxis />
                                    <RechartTooltip />
                                    <Bar dataKey="clicks" fill="#6bcf8b" radius={[8, 8, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Most Clicked */}
                <Grid item xs={12} md={4} sm={4} maxWidth={"50%"}>
                    <Card sx={glassCard}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Most Clicked Link
                            </Typography>

                            {mostClickedLink && (
                                <>
                                    <Tooltip title={mostClickedLink.longUrl} arrow>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                opacity: 0.7,
                                                whiteSpace: "nowrap",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                maxWidth: "50%",
                                                cursor: "pointer",
                                            }}
                                        >
                                            <strong>Long URL:</strong> {mostClickedLink.longUrl}
                                        </Typography>
                                    </Tooltip>
                                    <Typography
                                        variant="body2"
                                        sx={{ wordBreak: "break-all", opacity: 0.7 }}
                                    >
                                        {console.log(mostClickedLink)}
                                        <strong>Short URL</strong> : {`https://miniurl-backend.onrender.com/${mostClickedLink.shortUrl}`}
                                    </Typography>

                                    <Typography variant="h4" mt={2} fontWeight={600}>
                                        {mostClickedLink.clicks} Clicks
                                    </Typography>
                                </>
                            )}
                        </CardContent>
                    </Card>
                </Grid>




            </Grid>
        </Box>
    );
};

export default AnalyticsPage;