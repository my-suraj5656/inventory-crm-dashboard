import React from "react";
import { TextField, MenuItem, Grid } from "@mui/material";

const ServiceFilter = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  purposeFilter,
  setPurposeFilter,
}) => {
  const statusOptions = [
    "All",
    "Scheduled",
    "In Progress",
    "Completed",
    "Cancelled",
  ];

  const purposeOptions = [
    "All",
    "Preventive",
    "Breakdown",
    "Installation",
    "Training",
  ];

  return (
    <Grid container spacing={2}>
      {/* Search Input - takes more width on md+ screens */}
      <Grid item xs={12} sm={4} md={6}>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          label="Search by device, facility or engineer"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Grid>

      {/* Status Filter */}
      <Grid item xs={12} sm={4} md={3}>
        <TextField
          select
          fullWidth
          variant="outlined"
          size="small"
          label="Filter by Status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          {statusOptions.map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      {/* Purpose Filter */}
      <Grid item xs={12} sm={4} md={3}>
        <TextField
          select
          fullWidth
          variant="outlined"
          size="small"
          label="Filter by Purpose"
          value={purposeFilter}
          onChange={(e) => setPurposeFilter(e.target.value)}
        >
          {purposeOptions.map((purpose) => (
            <MenuItem key={purpose} value={purpose}>
              {purpose}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
    </Grid>
  );
};

export default ServiceFilter;
