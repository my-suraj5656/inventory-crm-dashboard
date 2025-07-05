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
} from "@mui/material";

const purposes = ["Preventive", "Breakdown", "Installation", "Training"];
const statuses = ["Scheduled", "In Progress", "Completed", "Cancelled"];

const ServiceAddModal = ({ open, onClose, onAdd, onUpdate, initialData }) => {
  const isEdit = Boolean(initialData);

  const [formData, setFormData] = useState({
    id: `SV${Date.now()}`,
    deviceId: "",
    deviceType: "",
    facilityName: "",
    date: "",
    engineer: "",
    purpose: "Preventive",
    status: "Scheduled",
    notes: "",
    attachments: [],
    duration: 1,
  });

  useEffect(() => {
    if (isEdit) {
      setFormData(initialData);
    }
  }, [initialData, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const requiredFields = [
      "deviceId",
      "deviceType",
      "facilityName",
      "engineer",
      "date",
    ];
    const isValid = requiredFields.every((field) => formData[field]);

    if (!isValid) {
      alert("Please fill all required fields.");
      return;
    }

    if (isEdit) {
      onUpdate(formData);
    } else {
      onAdd(formData);
    }

    onClose();
    if (!isEdit) {
      setFormData({
        id: `SV${Date.now()}`,
        deviceId: "",
        deviceType: "",
        facilityName: "",
        date: "",
        engineer: "",
        purpose: "Preventive",
        status: "Scheduled",
        notes: "",
        attachments: [],
        duration: 1,
      });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{isEdit ? "Edit Service Visit" : "Add Service Visit"}</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          {/* same input fields as before */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Device ID"
              name="deviceId"
              value={formData.deviceId}
              onChange={handleChange}
              required
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Device Type"
              name="deviceType"
              value={formData.deviceType}
              onChange={handleChange}
              required
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Facility Name"
              name="facilityName"
              value={formData.facilityName}
              onChange={handleChange}
              required
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Engineer"
              name="engineer"
              value={formData.engineer}
              onChange={handleChange}
              required
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="date"
              label="Date"
              name="date"
              InputLabelProps={{ shrink: true }}
              value={formData.date}
              onChange={handleChange}
              required
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              label="Purpose"
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              margin="normal"
            >
              {purposes.map((p) => (
                <MenuItem key={p} value={p}>
                  {p}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              label="Status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              margin="normal"
            >
              {statuses.map((s) => (
                <MenuItem key={s} value={s}>
                  {s}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="number"
              label="Duration (hrs)"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              inputProps={{ min: 1 }}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              margin="normal"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          {isEdit ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ServiceAddModal;
