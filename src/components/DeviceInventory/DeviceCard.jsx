import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  Chip,
  IconButton,
  Divider,
} from "@mui/material";

import WifiIcon from "@mui/icons-material/Wifi";
import WifiOffIcon from "@mui/icons-material/WifiOff";
import SettingsIcon from "@mui/icons-material/Settings";
import BatteryStdIcon from "@mui/icons-material/BatteryStd";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

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

const DeviceCard = ({ device, onDelete, onView, onEdit }) => {
  const role = localStorage.getItem("role"); // Role from localStorage

  return (
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
        <Box display="flex" justifyContent="space-between" mb={1}>
          <Typography variant="h6" fontWeight="bold">
            {device.type}
          </Typography>
          <Stack direction="row" alignItems="center" spacing={1}>
            {getStatusIcon(device.status)}
            <Chip label={device.status} size="small" />
          </Stack>
        </Box>

        <Box mt={2}>
          <InfoRow label="Device ID:" value={device.id} />
          <InfoRow label="Facility:" value={device.facility} />
          <InfoRow
            label="Battery:"
            value={
              <Stack direction="row" spacing={1} alignItems="center">
                <BatteryStdIcon
                  fontSize="small"
                  sx={{ color: getBatteryColor(device.batteryLevel) }}
                />
                <Typography
                  sx={{
                    color: getBatteryColor(device.batteryLevel),
                    fontWeight: 500,
                  }}
                >
                  {device.batteryLevel}%
                </Typography>
              </Stack>
            }
          />
          <InfoRow label="Last Service:" value={device.lastServiceDate} />
          <InfoRow label="AMC Status:" value={device.amcStatus} />
          <InfoRow label="CMC Status:" value={device.cmcStatus} />
        </Box>
      </CardContent>

      <Divider />

      <Box
        mt="auto"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={2}
      >
        <Typography variant="caption" color="text.secondary">
          SN: {device.serialNumber || device.id}
        </Typography>
        <Stack direction="row" spacing={1}>
          <IconButton size="small" color="primary">
            <VisibilityIcon fontSize="small" onClick={onView} />
          </IconButton>
          {role === "Admin" && (
            <>
              <IconButton size="small" color="default">
                <EditIcon fontSize="small" onClick={() => onEdit(device)} />
              </IconButton>
              <IconButton
                size="small"
                color="error"
                onClick={() => onDelete(device.id)}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </>
          )}
        </Stack>
      </Box>
    </Card>
  );
};

const InfoRow = ({ label, value }) => (
  <Box display="flex" justifyContent="space-between" mb={1}>
    <Typography variant="body2" color="text.secondary">
      {label}
    </Typography>
    <Box>
      {typeof value === "string" || typeof value === "number" ? (
        <Typography variant="body2" fontWeight={500}>
          {value}
        </Typography>
      ) : (
        value
      )}
    </Box>
  </Box>
);

export default DeviceCard;
