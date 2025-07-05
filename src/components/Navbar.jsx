// src/components/Navbar.jsx
import React from "react";
import { AppBar, Toolbar, Typography, Box, Button, Stack } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/auth";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const role = localStorage.getItem("role");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("role");
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#1976d2",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ letterSpacing: 1 }}
        ></Typography>

        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="body2" color="white">
            {role ? `Logged in as: ${role}` : "Not logged in"}
          </Typography>

          {role ? (
            <Button
              variant="outlined"
              color="inherit"
              size="small"
              onClick={handleLogout}
              sx={{
                borderColor: "#fff",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.1)",
                },
              }}
            >
              Logout
            </Button>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={handleLogin}
              sx={{
                fontWeight: 500,
                textTransform: "none",
              }}
            >
              Login
            </Button>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
