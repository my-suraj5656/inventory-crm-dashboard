import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Stack,
} from "@mui/material";

const statusOptions = ["Online", "Offline", "Maintenance"];
const amcCmcOptions = ["Active", "Inactive", "Pending"];

const DeviceAddModal = ({ open, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    id: "",
    type: "",
    facility: "",
    status: "Online",
    batteryLevel: "",
    lastServiceDate: "",
    installationDate: "",
    amcStatus: "Active",
    cmcStatus: "Active",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "batteryLevel" ? Number(value) : value,
    }));
  };

  const handleSubmit = () => {
    if (!formData.id || !formData.type) {
      alert("Please fill required fields");
      return;
    }
    onAdd(formData);  // Send to parent
    onClose();
    setFormData({
      id: "",
      type: "",
      facility: "",
      status: "Online",
      batteryLevel: "",
      lastServiceDate: "",
      installationDate: "",
      amcStatus: "Active",
      cmcStatus: "Active",
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add New Device</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Device ID"
            name="id"
            value={formData.id}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Device Type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Facility"
            name="facility"
            value={formData.facility}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            select
            fullWidth
          >
            {statusOptions.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Battery Level (%)"
            name="batteryLevel"
            type="number"
            value={formData.batteryLevel}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Last Service Date"
            name="lastServiceDate"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formData.lastServiceDate}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Installation Date"
            name="installationDate"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formData.installationDate}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="AMC Status"
            name="amcStatus"
            value={formData.amcStatus}
            onChange={handleChange}
            select
            fullWidth
          >
            {amcCmcOptions.map((opt) => (
              <MenuItem key={opt} value={opt}>
                {opt}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="CMC Status"
            name="cmcStatus"
            value={formData.cmcStatus}
            onChange={handleChange}
            select
            fullWidth
          >
            {amcCmcOptions.map((opt) => (
              <MenuItem key={opt} value={opt}>
                {opt}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained">
          Add Device
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeviceAddModal;
