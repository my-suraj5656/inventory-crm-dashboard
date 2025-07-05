// src/components/DeviceInventory/DeviceViewModal.jsx
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
  Stack,
  Divider,
  Grid,
  Paper,
} from "@mui/material";

import WifiIcon from "@mui/icons-material/Wifi";
import WifiOffIcon from "@mui/icons-material/WifiOff";
import SettingsIcon from "@mui/icons-material/Settings";
import BatteryStdIcon from "@mui/icons-material/BatteryStd";

const getStatusIcon = (status) => {
  switch (status) {
    case "Online":
      return <WifiIcon fontSize="small" sx={{ color: "green" }} />;
    case "Offline":
      return <WifiOffIcon fontSize="small" sx={{ color: "red" }} />;
    case "Maintenance":
      return <SettingsIcon fontSize="small" sx={{ color: "orange" }} />;
    default:
      return <SettingsIcon fontSize="small" sx={{ color: "gray" }} />;
  }
};

const getBatteryColor = (level) => {
  if (level > 60) return "green";
  if (level > 30) return "orange";
  return "red";
};

const InfoRow = ({ label, value }) => (
  <Grid container spacing={1} alignItems="center">
    <Grid item xs={5}>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
    </Grid>
    <Grid item xs={7}>
      {typeof value === "string" || typeof value === "number" ? (
        <Typography variant="body2" fontWeight={500}>
          {value}
        </Typography>
      ) : (
        value
      )}
    </Grid>
  </Grid>
);

const DeviceViewModal = ({ open, onClose, device }) => {
  if (!device) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{ sx: { borderRadius: 3, p: 1.5 } }}
    >
      <DialogTitle sx={{ fontWeight: "bold", fontSize: "1.3rem" }}>
        Device Details
      </DialogTitle>

      <DialogContent>
        <Paper
          elevation={0}
          sx={{ backgroundColor: "#f5f5f5", borderRadius: 2, p: 2, mb: 2 }}
        >
          <Typography variant="h6" fontWeight="bold">
            {device.type}
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center" mt={1}>
            {getStatusIcon(device.status)}
            <Typography fontSize="0.9rem" fontWeight={500}>
              {device.status}
            </Typography>
          </Stack>
        </Paper>

        <Stack spacing={1.5}>
          <InfoRow label="Device ID:" value={device.id} />
          <InfoRow label="Facility:" value={device.facility} />
          <InfoRow
            label="Battery:"
            value={
              <Stack direction="row" alignItems="center" spacing={1}>
                <BatteryStdIcon
                  sx={{
                    color: getBatteryColor(device.batteryLevel),
                    fontSize: "1rem",
                  }}
                />
                <Typography
                  fontWeight={500}
                  sx={{
                    color: getBatteryColor(device.batteryLevel),
                    fontSize: "0.9rem",
                  }}
                >
                  {device.batteryLevel}%
                </Typography>
              </Stack>
            }
          />
          <InfoRow label="Last Service Date:" value={device.lastServiceDate} />
          <InfoRow label="Installation Date:" value={device.installationDate} />
          <InfoRow label="AMC Status:" value={device.amcStatus} />
          <InfoRow label="CMC Status:" value={device.cmcStatus} />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{ textTransform: "none", fontWeight: 500 }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeviceViewModal;
