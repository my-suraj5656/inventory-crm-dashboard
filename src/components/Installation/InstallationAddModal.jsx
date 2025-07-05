// src/components/Installation/InstallationAddModal.jsx
import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  ImageList,
  ImageListItem,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

const statusOptions = [
  "Scheduled",
  "In Progress",
  "Completed",
  "Training Pending",
];

const InstallationAddModal = ({ open, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    id: Date.now(),
    deviceType: "",
    facilityName: "",
    engineer: "",
    installationDate: "",
    status: "Scheduled",
    checklistCompleted: false,
    trainingCompleted: false,
    trainingNotes: "",
    unboxingPhotos: [],
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleCheckbox = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageURLs = files.map((file) => URL.createObjectURL(file));
    setFormData((prev) => ({
      ...prev,
      unboxingPhotos: [...prev.unboxingPhotos, ...imageURLs],
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.deviceType) newErrors.deviceType = "Device type is required";
    if (!formData.facilityName)
      newErrors.facilityName = "Facility name is required";
    if (!formData.engineer) newErrors.engineer = "Engineer name is required";
    if (!formData.installationDate)
      newErrors.installationDate = "Date is required";
    if (!formData.trainingNotes)
      newErrors.trainingNotes = "Training notes are required";
    if (formData.unboxingPhotos.length === 0)
      newErrors.unboxingPhotos = "At least 1 photo is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    onAdd(formData);
    onClose();
    setFormData({
      id: Date.now(),
      deviceType: "",
      facilityName: "",
      engineer: "",
      installationDate: "",
      status: "Scheduled",
      checklistCompleted: false,
      trainingCompleted: false,
      trainingNotes: "",
      unboxingPhotos: [],
    });
    setErrors({});
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" mb={2}>
          Add Installation
        </Typography>

        <TextField
          label="Device Type"
          name="deviceType"
          value={formData.deviceType}
          onChange={handleChange}
          fullWidth
          margin="dense"
          error={!!errors.deviceType}
          helperText={errors.deviceType}
        />
        <TextField
          label="Facility Name"
          name="facilityName"
          value={formData.facilityName}
          onChange={handleChange}
          fullWidth
          margin="dense"
          error={!!errors.facilityName}
          helperText={errors.facilityName}
        />
        <TextField
          label="Engineer"
          name="engineer"
          value={formData.engineer}
          onChange={handleChange}
          fullWidth
          margin="dense"
          error={!!errors.engineer}
          helperText={errors.engineer}
        />
        <TextField
          label="Installation Date"
          name="installationDate"
          type="date"
          value={formData.installationDate}
          onChange={handleChange}
          fullWidth
          margin="dense"
          InputLabelProps={{ shrink: true }}
          error={!!errors.installationDate}
          helperText={errors.installationDate}
        />
        <TextField
          select
          label="Status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          fullWidth
          margin="dense"
        >
          {statusOptions.map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </TextField>

        <FormControlLabel
          control={
            <Checkbox
              checked={formData.checklistCompleted}
              onChange={handleCheckbox}
              name="checklistCompleted"
            />
          }
          label="Checklist Completed"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.trainingCompleted}
              onChange={handleCheckbox}
              name="trainingCompleted"
            />
          }
          label="Training Completed"
        />

        <TextField
          label="Training Notes"
          name="trainingNotes"
          value={formData.trainingNotes}
          onChange={handleChange}
          fullWidth
          multiline
          rows={3}
          margin="dense"
          error={!!errors.trainingNotes}
          helperText={errors.trainingNotes}
        />

        <Box mt={2}>
          <Button
            variant="outlined"
            startIcon={<PhotoCamera />}
            component="label"
            size="small"
          >
            Upload Photos
            <input
              type="file"
              hidden
              multiple
              accept="image/*"
              onChange={handleImageUpload}
            />
          </Button>
          {errors.unboxingPhotos && (
            <Typography variant="caption" color="error">
              {errors.unboxingPhotos}
            </Typography>
          )}
          {formData.unboxingPhotos.length > 0 && (
            <ImageList cols={3} rowHeight={100} sx={{ mt: 1 }}>
              {formData.unboxingPhotos.map((photo, idx) => (
                <ImageListItem key={idx}>
                  <img src={photo} alt={`photo-${idx}`} loading="lazy" />
                </ImageListItem>
              ))}
            </ImageList>
          )}
        </Box>

        <Box display="flex" justifyContent="flex-end" gap={1} mt={2}>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            Add
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default InstallationAddModal;
