import React, { useState } from "react";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import BuildIcon from "@mui/icons-material/Build";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DashboardIcon from "@mui/icons-material/Dashboard";

import { NavLink } from "react-router-dom";

const drawerWidth = 240;

const menuItems = [
  { text: "Dashboard", path: "/", icon: <DashboardIcon /> },
  { text: "Inventory", path: "/inventory", icon: <Inventory2Icon /> },
  { text: "Installation", path: "/install", icon: <BuildIcon /> },
  { text: "Services", path: "/services", icon: <MiscellaneousServicesIcon /> },
  {
    text: "AMC/CMC Tracker",
    path: "/amccmctracker",
    icon: <TrackChangesIcon />,
  },
  { text: "Alerts", path: "/alerts", icon: <NotificationsIcon /> },
];

const Sidebar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  // console.log(mobileOpen);

  const drawerContent = (
    <Box sx={{ bgcolor: "primary.main", color: "white", height: "100%" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ ml: 1 }}>
          Device CRM
        </Typography>
      </Toolbar>
      <List>
        {menuItems.map(({ text, path, icon }) => (
          <ListItemButton
            key={text}
            component={NavLink}
            to={path}
            onClick={() => setMobileOpen(false)}
            sx={{
              color: "white",
              "&.active": { bgcolor: "primary.dark" },
              "&:hover": { bgcolor: "primary.light" },
            }}
          >
            <ListItemIcon sx={{ color: "white" }}>{icon}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      {/* Hamburger Icon (Mobile only) */}
      <IconButton
        color="inherit"
        onClick={handleDrawerToggle}
        edge="start"
        sx={{
          display: { xs: "block", md: "none" },
          position: "fixed",
          top: 8,
          left: 8,
          zIndex: 1301,
        }}
      >
        <MenuIcon />
      </IconButton>

      {/* Permanent Sidebar for Desktop */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          width: drawerWidth,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>

      {/* Temporary Drawer for Mobile */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: "block", md: "none" },
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;
