// src/components/Contracts/ContractFilter.jsx
import React from "react";
import { TextField, MenuItem, Grid } from "@mui/material";

const typeOptions = [
  { label: "All Types", value: "All" },
  { label: "AMC", value: "AMC" },
  { label: "CMC", value: "CMC" },
  { label: "Warranty", value: "Warranty" },
];

const statusOptions = [
  { label: "All Status", value: "All" },
  { label: "Active", value: "Active" },
  { label: "Expired", value: "Expired" },
  { label: "Expiring Soon", value: "Expiring Soon" },
  { label: "Pending Renewal", value: "Pending Renewal" },
];

const ContractFilter = ({
  searchTerm,
  onSearchChange,
  type,
  onTypeChange,
  status,
  onStatusChange,
}) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          size="small"
          label="Search by Device ID, Facility or Contact"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </Grid>

      <Grid item xs={6} sm={3}>
        <TextField
          select
          fullWidth
          size="small"
          label="Filter by Type"
          variant="outlined"
          value={type}
          onChange={(e) => onTypeChange(e.target.value)}
        >
          {typeOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      <Grid item xs={6} sm={3}>
        <TextField
          select
          fullWidth
          size="small"
          label="Filter by Status"
          variant="outlined"
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
        >
          {statusOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
    </Grid>
  );
};

export default ContractFilter;
