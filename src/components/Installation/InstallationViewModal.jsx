// src/components/InstallationViewModal.jsx
import React from "react";
import {
  Box,
  Modal,
  Typography,
  Button,
} from "@mui/material";

const InstallationViewModal = ({ open, onClose, inst }) => {
  if (!inst) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          width: 400,
          maxHeight: "80vh",
          overflowY: "auto",
        }}
      >
        <Typography variant="h6" gutterBottom>
          {inst.deviceType} - {inst.facilityName}
        </Typography>
        <Typography><strong>ID:</strong> {inst.id}</Typography>
        <Typography><strong>Engineer:</strong> {inst.engineer}</Typography>
        <Typography><strong>Installation Date:</strong> {inst.installationDate}</Typography>
        <Typography><strong>Status:</strong> {inst.status}</Typography>
        <Typography><strong>Checklist:</strong> {inst.checklistCompleted ? "✅" : "⏳"}</Typography>
        <Typography><strong>Training:</strong> {inst.trainingCompleted ? "✅" : "⏳"}</Typography>
        <Typography><strong>Notes:</strong> {inst.trainingNotes || "N/A"}</Typography>
        <Typography><strong>Unboxing Photos:</strong> {inst.unboxingPhotos.length}</Typography>

        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button onClick={onClose} variant="contained" color="primary" size="small">
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default InstallationViewModal;
