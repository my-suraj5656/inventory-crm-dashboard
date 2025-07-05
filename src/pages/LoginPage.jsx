// src/pages/LoginPage.jsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Alert,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/slices/auth";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  // console.log(role);

  const auth = useSelector((state) => state.auth.role);
  // console.log(auth);

  const handleLogin = () => {
    if (!role) {
      setError("Please select a role to continue.");
      return;
    }
    dispatch(login({ role }));
    setError("");
    navigate("/");
  };

  useEffect(() => {
    if (auth) {
      localStorage.setItem("role", auth);
    }
  }, [auth]);

  return (
    <Box
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor="#f4f6f8"
    >
      <Paper elevation={4} sx={{ p: 5, width: 400 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom align="center">
          Login to Device CRM
        </Typography>

        {error && (
          <Alert severity="error" sx={{ my: 2 }}>
            {error}
          </Alert>
        )}

        <FormControl component="fieldset" sx={{ mt: 3 }} fullWidth>
          <FormLabel component="legend">Select Role</FormLabel>
          <RadioGroup
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <FormControlLabel value="Admin" control={<Radio />} label="Admin" />
            <FormControlLabel
              value="Technician"
              control={<Radio />}
              label="Technician"
            />
          </RadioGroup>
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 4 }}
          onClick={handleLogin}
        >
          Login
        </Button>
      </Paper>
    </Box>
  );
};

export default LoginPage;
