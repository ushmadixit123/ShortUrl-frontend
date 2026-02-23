import React from "react";
import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Box,
    Typography,
} from "@mui/material";
import logo from "../assets/logo1.png";
import {
    Dashboard,
    Link as LinkIcon,
    BarChart,
    QrCode,
    Person,
    Settings,
    Logout,
} from "@mui/icons-material";
import { NavLink, useNavigate } from "react-router-dom";

const drawerWidth = 240;

const menuItems = [
    { text: "Dashboard", icon: <Dashboard />, path: "/dashboard" },
    { text: "My URLs", icon: <LinkIcon />, path: "/urls" },
    { text: "Analytics", icon: <BarChart />, path: "/analytics" },
    { text: "QR Codes", icon: <QrCode />, path: "/qrcodes" },
    { text: "Profile", icon: <Person />, path: "/profile" },
    { text: "Settings", icon: <Settings />, path: "/settings" },
];

const Sidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <Drawer
  variant="permanent"
  sx={{
    width: drawerWidth,
    flexShrink: 0,
    "& .MuiDrawer-paper": {
      width: drawerWidth,
      boxSizing: "border-box",
      backgroundColor: "#ffffff",
      borderRight: "1px solid #e5e7eb",
    },
  }}
>
  <Box sx={{ px: 3, py: 3 }}>
    <img src={logo} alt="logo" style={{ width: 182 }} />
  </Box>

  <List sx={{ px: 2 }}>
    {menuItems.map((item) => (
      <ListItem key={item.text} disablePadding>
        <ListItemButton
          component={NavLink}
          to={item.path}
          sx={{
            borderRadius: 2,
            mb: 1,
            px: 2,
            "&.active": {
              backgroundColor: "#EEF2FF",
              color: "#4F46E5",
            },
          }}
        >
          <ListItemIcon sx={{ color: "inherit", minWidth: 36 }}>
            {item.icon}
          </ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItemButton>
      </ListItem>
    ))}
  </List>

  <Box sx={{ flexGrow: 1 }} />

  <Box sx={{ p: 2 }}>
    <ListItemButton
      onClick={handleLogout}
      sx={{
        borderRadius: 2,
        color: "#ef4444",
      }}
    >
      <ListItemIcon sx={{ color: "#ef4444" }}>
        <Logout />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItemButton>
  </Box>
</Drawer>
    );
};

export default Sidebar;