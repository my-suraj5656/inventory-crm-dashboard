// src/components/Contracts/ContractViewModal.jsx
import React from "react";
import {
  Modal,
  Box,
  Typography,
  Divider,
  Stack,
  Chip,
  IconButton,
} from "@mui/material";
import { Close, AttachMoney, CalendarMonth, Person, Description } from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  p: 3,
  maxHeight: "90vh",
  overflowY: "auto",
};

const getStatusColor = (status) => {
  switch (status) {
    case "Active": return "success";
    case "Expired": return "error";
    case "Expiring Soon": return "warning";
    case "Pending Renewal": return "info";
    default: return "default";
  }
};

const getTypeColor = (type) => {
  switch (type) {
    case "AMC": return "primary";
    case "CMC": return "secondary";
    case "Warranty": return "success";
    default: return "default";
  }
};

const ContractViewModal = ({ open, onClose, contract }) => {
  if (!contract) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" fontWeight="bold">
            {contract.deviceType}
          </Typography>
          <IconButton size="small" onClick={onClose}>
            <Close />
          </IconButton>
        </Box>

        <Stack direction="row" spacing={1} mb={2}>
          <Chip label={contract.type} color={getTypeColor(contract.type)} size="small" />
          <Chip label={contract.status} color={getStatusColor(contract.status)} size="small" />
        </Stack>

        <Stack spacing={1} mb={2}>
          <Box display="flex" alignItems="center" gap={1}>
            <Description fontSize="small" color="disabled" />
            <Typography variant="body2">
              <strong>Facility:</strong> {contract.facilityName}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <Person fontSize="small" color="disabled" />
            <Typography variant="body2">
              <strong>Contact:</strong> {contract.contactPerson}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <AttachMoney fontSize="small" color="disabled" />
            <Typography variant="body2">
              <strong>Value:</strong> ${contract.value.toLocaleString()}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <CalendarMonth fontSize="small" color="disabled" />
            <Typography variant="body2">
              <strong>Period:</strong> {contract.startDate} to {contract.endDate}
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ my: 2 }} />

        <Typography variant="body2" color="text.secondary" gutterBottom>
          <strong>Contract Terms:</strong>
        </Typography>
        <Box bgcolor="grey.100" p={2} borderRadius={2}>
          <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
            {contract.terms}
          </Typography>
        </Box>

        <Typography variant="caption" color="text.secondary" mt={2}>
          ID: {contract.id}
        </Typography>
      </Box>
    </Modal>
  );
};

export default ContractViewModal;
