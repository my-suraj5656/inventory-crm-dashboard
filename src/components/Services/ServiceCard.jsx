import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Stack,
  Button,
} from "@mui/material";
import {
  CalendarMonth,
  Person,
  AccessTime,
  Place,
  Description,
} from "@mui/icons-material";

const getStatusColor = (status) => {
  switch (status) {
    case "Completed":
      return "success";
    case "In Progress":
      return "info";
    case "Scheduled":
      return "warning";
    case "Cancelled":
      return "error";
    default:
      return "default";
  }
};

const getPurposeColor = (purpose) => {
  switch (purpose) {
    case "Preventive":
      return "success";
    case "Breakdown":
      return "error";
    case "Installation":
      return "primary";
    case "Training":
      return "secondary";
    default:
      return "default";
  }
};

const ServiceCard = ({
  service,
  onDelete,
  onUpdateStatus,
  onUpdate,
  onEdit,
  onView,
}) => {
  return (
    <Card
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        width: "100%",
        maxWidth: 360, // Uniform width
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" fontWeight="bold">
          {service.deviceType}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Device ID: {service.deviceId}
        </Typography>

        <Box mt={2} display="flex" gap={1}>
          <Chip
            label={service.purpose}
            color={getPurposeColor(service.purpose)}
            size="small"
          />
          <Chip
            label={service.status}
            color={getStatusColor(service.status)}
            size="small"
          />
        </Box>

        <Stack spacing={1} mt={2}>
          <Box display="flex" alignItems="center" gap={1}>
            <CalendarMonth fontSize="small" />
            <Typography variant="body2">{service.date}</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <Person fontSize="small" />
            <Typography variant="body2">{service.engineer}</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <AccessTime fontSize="small" />
            <Typography variant="body2">{service.duration} hours</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <Place fontSize="small" />
            <Typography variant="body2">{service.facilityName}</Typography>
          </Box>
        </Stack>

        {service.notes && (
          <Box mt={2}>
            <Typography variant="body2" fontWeight="bold">
              Notes:
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {service.notes}
            </Typography>
          </Box>
        )}
      </CardContent>

      <Box
        px={2}
        pb={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="caption" color="text.secondary">
          {service.attachments.length} Attachment(s)
        </Typography>
        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            size="small"
            onClick={() => onEdit(service)}
          >
            Edit
          </Button>

          <Button
            variant="outlined"
            size="small"
            startIcon={<Description />}
            onClick={() => onView(service)}
          >
            View Report
          </Button>
        </Stack>
      </Box>
    </Card>
  );
};

export default ServiceCard;
