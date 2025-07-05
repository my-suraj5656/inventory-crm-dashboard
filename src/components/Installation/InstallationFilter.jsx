import React from "react";
import { Box, TextField, Select, MenuItem } from "@mui/material";

const InstallationFilter = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
}) => {
  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column", sm: "row" }}
      gap={2}
      alignItems="center"
      width="100%"
    >
      <TextField
        label="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        size="small"
        fullWidth
      />
      <Select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        size="small"
        fullWidth
      >
        <MenuItem value="All">All</MenuItem>
        <MenuItem value="Scheduled">Scheduled</MenuItem>
        <MenuItem value="In Progress">In Progress</MenuItem>
        <MenuItem value="Completed">Completed</MenuItem>
        <MenuItem value="Training Pending">Training Pending</MenuItem>
      </Select>
    </Box>
  );
};

export default InstallationFilter;
