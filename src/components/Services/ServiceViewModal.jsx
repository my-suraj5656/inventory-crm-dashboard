import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Grid,
  Button,
  Chip,
  Box,
  Link,
  Divider,
} from "@mui/material";

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

const StyledLabel = ({ children }) => (
  <Typography
    variant="subtitle2"
    color="text.secondary"
    sx={{ fontWeight: 500, fontSize: "0.85rem" }}
  >
    {children}
  </Typography>
);

const StyledValue = ({ children }) => (
  <Typography sx={{ fontSize: "0.95rem" }}>{children}</Typography>
);

const ServiceViewModal = ({ open, onClose, service }) => {
  if (!service) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle fontWeight="bold">Service Visit Details</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          {/* Row 1 */}
          <Grid item xs={6}>
            <StyledLabel>Device ID</StyledLabel>
            <StyledValue>{service.deviceId}</StyledValue>
          </Grid>
          <Grid item xs={6}>
            <StyledLabel>Device Type</StyledLabel>
            <StyledValue>{service.deviceType}</StyledValue>
          </Grid>

          {/* Row 2 */}
          <Grid item xs={6}>
            <StyledLabel>Facility</StyledLabel>
            <StyledValue>{service.facilityName}</StyledValue>
          </Grid>
          <Grid item xs={6}>
            <StyledLabel>Engineer</StyledLabel>
            <StyledValue>{service.engineer}</StyledValue>
          </Grid>

          {/* Row 3 */}
          <Grid item xs={6}>
            <StyledLabel>Date</StyledLabel>
            <StyledValue>{service.date}</StyledValue>
          </Grid>
          <Grid item xs={6}>
            <StyledLabel>Duration</StyledLabel>
            <StyledValue>{service.duration} hrs</StyledValue>
          </Grid>

          {/* Row 4 */}
          <Grid item xs={6}>
            <StyledLabel>Purpose</StyledLabel>
            <Chip
              label={service.purpose}
              color={getPurposeColor(service.purpose)}
              size="small"
              sx={{ mt: 0.5 }}
            />
          </Grid>
          <Grid item xs={6}>
            <StyledLabel>Status</StyledLabel>
            <Chip
              label={service.status}
              color={getStatusColor(service.status)}
              size="small"
              sx={{ mt: 0.5 }}
            />
          </Grid>

          {/* Notes */}
          {service.notes && (
            <>
              <Grid item xs={12}>
                <Divider sx={{ my: 1 }} />
                <StyledLabel>Notes</StyledLabel>
                <StyledValue>{service.notes}</StyledValue>
              </Grid>
            </>
          )}

          {/* Attachments */}
          {service.attachments?.length > 0 && (
            <>
              <Grid item xs={12}>
                <Divider sx={{ my: 1 }} />
                <StyledLabel>Attachments</StyledLabel>
                <Box display="flex" flexDirection="column" gap={0.5} mt={0.5}>
                  {service.attachments.map((file, index) => (
                    <Link key={index} href={`#`} underline="hover">
                      📎 {file}
                    </Link>
                  ))}
                </Box>
              </Grid>
            </>
          )}
        </Grid>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} variant="contained" color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ServiceViewModal;
