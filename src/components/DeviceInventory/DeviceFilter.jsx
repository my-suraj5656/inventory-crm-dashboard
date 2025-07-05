import React from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Button,
} from "@mui/material";

const DeviceFilter = ({
  searchTerm,
  setsearchTerm,
  statusFilter,
  setStatusFilter,
  onAddDevice, 
}) => {
  const role = localStorage.getItem("role"); // Role from localStorage

  return (
    <Box mb={2} display="flex" gap={2} flexWrap="wrap" alignItems="center">
      <TextField
        label="Search"
        value={searchTerm}
        onChange={(e) => setsearchTerm(e.target.value)}
      />

      <FormControl sx={{ minWidth: 150 }}>
        <InputLabel>Status</InputLabel>
        <Select
          value={statusFilter}
          label="Status"
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Online">Online</MenuItem>
          <MenuItem value="Offline">Offline</MenuItem>
          <MenuItem value="Maintenance">Maintenance</MenuItem>
        </Select>
      </FormControl>

      {role === "Admin" && (
        <Button
          variant="contained"
          color="primary"
          onClick={onAddDevice} // 🆕 Function to open modal
          sx={{ whiteSpace: "nowrap", height: "54px" }}
        >
          + Add Device
        </Button>
      )}
    </Box>
  );
};

export default DeviceFilter;
