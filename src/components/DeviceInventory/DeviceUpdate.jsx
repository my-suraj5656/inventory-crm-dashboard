import React, { useEffect, useState } from "react";
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

const DeviceUpdateModal = ({ open, onClose, device, onUpdate }) => {
  const [formData, setFormData] = useState({ ...device });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (device) {
      setFormData(device);
      setErrors({});
    }
  }, [device]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "batteryLevel" ? Number(value) : value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.type.trim()) newErrors.type = "Device Type is required";
    if (!formData.facility.trim()) newErrors.facility = "Facility is required";
    if (
      formData.batteryLevel === "" ||
      isNaN(formData.batteryLevel) ||
      formData.batteryLevel < 0 ||
      formData.batteryLevel > 100
    ) {
      newErrors.batteryLevel = "Battery must be between 0 and 100";
    }
    if (!formData.lastServiceDate) newErrors.lastServiceDate = "Required";
    if (!formData.installationDate) newErrors.installationDate = "Required";
    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onUpdate(formData);
    onClose();
  };

  if (!device) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Update Device</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Device ID"
            name="id"
            value={formData.id}
            disabled
            fullWidth
          />
          <TextField
            label="Device Type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            fullWidth
            error={!!errors.type}
            helperText={errors.type}
          />
          <TextField
            label="Facility"
            name="facility"
            value={formData.facility}
            onChange={handleChange}
            fullWidth
            error={!!errors.facility}
            helperText={errors.facility}
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
            error={!!errors.batteryLevel}
            helperText={errors.batteryLevel}
          />
          <TextField
            label="Last Service Date"
            name="lastServiceDate"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formData.lastServiceDate}
            onChange={handleChange}
            fullWidth
            error={!!errors.lastServiceDate}
            helperText={errors.lastServiceDate}
          />
          <TextField
            label="Installation Date"
            name="installationDate"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formData.installationDate}
            onChange={handleChange}
            fullWidth
            error={!!errors.installationDate}
            helperText={errors.installationDate}
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
          Update Device
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeviceUpdateModal;
