import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { Box, Toolbar } from "@mui/material";

const Layout = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, px: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
