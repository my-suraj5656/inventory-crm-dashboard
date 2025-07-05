// src/components/Contracts/ContractAddUpdate.jsx
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Grid,
  Box,
  Typography,
} from "@mui/material";

const types = ["AMC", "CMC", "Warranty"];
const statuses = ["Active", "Expired", "Expiring Soon", "Pending Renewal"];

const initialForm = {
  deviceType: "",
  deviceId: "",
  facilityName: "",
  contactPerson: "",
  value: "",
  startDate: "",
  endDate: "",
  terms: "",
  type: "AMC",
  status: "Active",
};

const ContractAddUpdate = ({
  open,
  onClose,
  onAdd,
  onUpdate,
  mode = "add",
  initialData = null,
}) => {
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    if (open) {
      if (mode === "edit" && initialData) {
        setFormData({ ...initialData });
      } else {
        setFormData(initialForm);
      }
    }
  }, [open, mode, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const contractPayload = {
      ...formData,
      value: parseFloat(formData.value),
    };

    if (mode === "add") {
      contractPayload.id = `CON${Math.random().toString(36).substring(2, 7)}`;
      onAdd(contractPayload);
    } else {
      onUpdate(contractPayload);
    }

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h6" fontWeight="bold">
          {mode === "edit" ? "Edit Contract" : "Add Contract"}
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ py: 3 }}>
        <Box component="form" noValidate autoComplete="off">
          <Grid container spacing={2}>
            {[
              ["deviceType", "Device Type"],
              ["deviceId", "Device ID"],
              ["facilityName", "Facility Name"],
              ["contactPerson", "Contact Person"],
              ["value", "Value", "number"],
              ["terms", "Contract Terms", "text", true],
              ["startDate", "Start Date", "date"],
              ["endDate", "End Date", "date"],
            ].map(([name, label, type = "text", multiline = false]) => (
              <Grid item xs={12} sm={6} key={name}>
                <TextField
                  name={name}
                  label={label}
                  type={type}
                  value={formData[name]}
                  onChange={handleChange}
                  multiline={multiline}
                  rows={multiline ? 3 : undefined}
                  InputLabelProps={
                    type === "date" ? { shrink: true } : undefined
                  }
                  fullWidth
                />
              </Grid>
            ))}

            <Grid item xs={12} sm={6}>
              <TextField
                name="type"
                label="Type"
                select
                value={formData.type}
                onChange={handleChange}
                fullWidth
              >
                {types.map((t) => (
                  <MenuItem key={t} value={t}>
                    {t}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                name="status"
                label="Status"
                select
                value={formData.status}
                onChange={handleChange}
                fullWidth
              >
                {statuses.map((s) => (
                  <MenuItem key={s} value={s}>
                    {s}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained">
          {mode === "edit" ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ContractAddUpdate;
