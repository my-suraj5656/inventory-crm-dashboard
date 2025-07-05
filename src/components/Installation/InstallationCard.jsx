import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
  Divider,
  IconButton,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import InstallationEditModal from "./InstallationUpdate";
import InstallationViewModal from "./InstallationViewModal";

const getStatusColor = (status) => {
  switch (status) {
    case "Completed":
      return "success";
    case "In Progress":
      return "primary";
    case "Scheduled":
      return "warning";
    case "Training Pending":
      return "info";
    default:
      return "default";
  }
};

const InstallationCard = ({ inst, onDelete, onUpdate }) => {
  // console.log(inst);

  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  return (
    <>
      <Card
        variant="outlined"
        sx={{
          width: 340,
          height: "100%",
          borderRadius: 2,
          boxShadow: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <CardContent sx={{ flexGrow: 1 }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={1}
          >
            <Box>
              <Typography variant="h6">{inst.deviceType}</Typography>
              <Typography variant="body2" color="text.secondary">
                {inst.facilityName}
              </Typography>
            </Box>
            <Chip
              label={inst.status}
              color={getStatusColor(inst.status)}
              size="small"
            />
          </Box>

          <Box display="grid" gap={0.5} mb={1}>
            <Typography variant="body2">
              <strong>Engineer:</strong> {inst.engineer}
            </Typography>
            <Typography variant="body2">
              <strong>Date:</strong> {inst.installationDate}
            </Typography>
            <Typography variant="body2">
              <strong>Checklist:</strong>{" "}
              {inst.checklistCompleted ? "✅ Completed" : "⏳ Pending"}
            </Typography>
            <Typography variant="body2">
              <strong>Training:</strong>{" "}
              {inst.trainingCompleted ? "✅ Completed" : "⏳ Pending"}
            </Typography>
          </Box>

          {inst.trainingNotes && (
            <Box mt={1} p={1} bgcolor="#f9f9f9" borderRadius={1}>
              <Typography variant="body2" color="text.secondary">
                <strong>Notes:</strong> {inst.trainingNotes}
              </Typography>
            </Box>
          )}
        </CardContent>

        <Divider />

        <Box
          p={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="caption" color="text.secondary">
            {inst.unboxingPhotos.length} Photos
          </Typography>
          <Box display="flex" gap={1}>
            <IconButton
              size="small"
              color="primary"
              onClick={() => setViewOpen(true)}
            >
              <VisibilityIcon fontSize="small" />
            </IconButton>
            <Button
              size="small"
              variant="outlined"
              color="primary"
              onClick={() => setEditOpen(true)}
            >
              Update
            </Button>
            <Button
              size="small"
              variant="outlined"
              color="error"
              onClick={() => onDelete(inst.id)}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Card>

      <InstallationViewModal
        open={viewOpen}
        onClose={() => setViewOpen(false)}
        inst={inst}
      />
      <InstallationEditModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        inst={inst}
        onSave={onUpdate}
      />
    </>
  );
};

export default InstallationCard;
