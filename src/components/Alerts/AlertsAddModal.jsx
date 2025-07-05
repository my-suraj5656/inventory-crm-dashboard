import React, { useState } from 'react';
import {
  Modal, Box, TextField, Button, Typography, MenuItem, ImageList, ImageListItem
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

const statusOptions = ['Pending', 'Resolved'];

const AlertAddModal = ({ open, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    id: Date.now(),
    deviceId: '',
    facility: '',
    issue: '',
    reportedBy: '',
    status: 'Pending',
    date: new Date().toISOString().split('T')[0],
    photos: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageURLs = files.map((file) => URL.createObjectURL(file));
    setFormData((prev) => ({
      ...prev,
      photos: [...prev.photos, ...imageURLs],
    }));
  };

  const handleSubmit = () => {
    onAdd(formData);
    onClose();
    setFormData({
      id: Date.now(),
      deviceId: '',
      facility: '',
      issue: '',
      reportedBy: '',
      status: 'Pending',
      date: new Date().toISOString().split('T')[0],
      photos: [],
    });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        width: 400, bgcolor: 'white', p: 4, borderRadius: 2,
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)'
      }}>
        <Typography variant="h6" mb={2}>Log Alert</Typography>

        <TextField label="Device ID" name="deviceId" fullWidth margin="dense" value={formData.deviceId} onChange={handleChange} required />
        <TextField label="Facility" name="facility" fullWidth margin="dense" value={formData.facility} onChange={handleChange} required />
        <TextField label="Reported By" name="reportedBy" fullWidth margin="dense" value={formData.reportedBy} onChange={handleChange} required />
        <TextField label="Issue Description" name="issue" fullWidth multiline rows={3} margin="dense" value={formData.issue} onChange={handleChange} required />

        <TextField
          select label="Status" name="status" fullWidth margin="dense"
          value={formData.status} onChange={handleChange}
        >
          {statusOptions.map(status => (
            <MenuItem key={status} value={status}>{status}</MenuItem>
          ))}
        </TextField>

        <Button variant="outlined" startIcon={<PhotoCamera />} component="label" sx={{ mt: 2 }}>
          Upload Photos
          <input type="file" hidden multiple accept="image/*" onChange={handleImageUpload} />
        </Button>

        <ImageList cols={3} rowHeight={100} sx={{ mt: 1 }}>
          {formData.photos.map((photo, idx) => (
            <ImageListItem key={idx}>
              <img src={photo} alt={`photo-${idx}`} />
            </ImageListItem>
          ))}
        </ImageList>

        <Box mt={2} display="flex" justifyContent="flex-end" gap={1}>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">Save</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AlertAddModal;
