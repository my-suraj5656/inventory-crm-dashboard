import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Divider,
  Button,
  Stack,
  Alert,
} from "@mui/material";
import {
  AttachMoney,
  CalendarMonth,
  Person,
  Description,
  WarningAmber,
  Visibility,
} from "@mui/icons-material";
import dayjs from "dayjs";

const getStatusColor = (status) => {
  switch (status) {
    case "Active":
      return "success";
    case "Expired":
      return "error";
    case "Expiring Soon":
      return "warning";
    case "Pending Renewal":
      return "info";
    default:
      return "default";
  }
};

const getTypeColor = (type) => {
  switch (type) {
    case "AMC":
      return "primary";
    case "CMC":
      return "secondary";
    case "Warranty":
      return "success";
    default:
      return "default";
  }
};

const ContractCard = ({ contract, onView, onEdit, onDelete }) => {
  const today = dayjs();
  const endDate = dayjs(contract.endDate);
  const daysUntilExpiry = endDate.diff(today, "day");
  const isExpiringSoon = daysUntilExpiry <= 30 && daysUntilExpiry >= 0;
  const isExpired = daysUntilExpiry < 0;

  return (
    <Card
      sx={{
        width: 340,
        height: 450,
        borderRadius: 3,
        boxShadow: 2,
        p: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardContent sx={{ flexGrow: 1, overflow: "hidden" }}>
        {/* Header */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Box>
            <Typography variant="h6" fontWeight="bold">
              {contract.deviceType}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Device ID: {contract.deviceId}
            </Typography>
          </Box>
          <Stack direction="row" spacing={1}>
            <Chip
              label={contract.type}
              color={getTypeColor(contract.type)}
              size="small"
            />
            <Chip
              label={
                isExpired
                  ? "Expired"
                  : isExpiringSoon
                  ? "Expiring Soon"
                  : contract.status
              }
              color={
                isExpired
                  ? "error"
                  : isExpiringSoon
                  ? "warning"
                  : getStatusColor(contract.status)
              }
              size="small"
            />
          </Stack>
        </Box>

        {/* Contract Details */}
        <Stack spacing={1} mb={2}>
          <Box display="flex" alignItems="center" gap={1}>
            <Description fontSize="small" color="disabled" />
            <Typography variant="body2" fontWeight="medium">
              Facility:
            </Typography>
            <Typography variant="body2">{contract.facilityName}</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <Person fontSize="small" color="disabled" />
            <Typography variant="body2" fontWeight="medium">
              Contact:
            </Typography>
            <Typography variant="body2">{contract.contactPerson}</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <AttachMoney fontSize="small" color="disabled" />
            <Typography variant="body2" fontWeight="medium">
              Value:
            </Typography>
            <Typography variant="body2">
              ${contract.value.toLocaleString()}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <CalendarMonth fontSize="small" color="disabled" />
            <Typography variant="body2" fontWeight="medium">
              Period:
            </Typography>
            <Typography variant="body2">
              {contract.startDate} to {contract.endDate}
            </Typography>
          </Box>
        </Stack>

        {/* Expiry Alert */}
        {isExpiringSoon && (
          <Alert
            icon={<WarningAmber fontSize="inherit" />}
            severity="warning"
            sx={{ mb: 2 }}
          >
            Expires in {daysUntilExpiry}{" "}
            {daysUntilExpiry === 1 ? "day" : "days"}
          </Alert>
        )}
        {isExpired && (
          <Alert
            icon={<WarningAmber fontSize="inherit" />}
            severity="error"
            sx={{ mb: 2 }}
          >
            Expired {Math.abs(daysUntilExpiry)}{" "}
            {Math.abs(daysUntilExpiry) === 1 ? "day" : "days"} ago
          </Alert>
        )}

        {/* Contract Terms */}
        <Box mb={2}>
          <Typography variant="body2" color="text.secondary" mb={0.5}>
            Contract Terms:
          </Typography>
          <Box
            bgcolor="grey.100"
            p={1.5}
            borderRadius={2}
            sx={{
              fontSize: "0.875rem",
              overflow: "auto",
              maxHeight: 80,
            }}
          >
            {contract.terms}
          </Box>
        </Box>
      </CardContent>

      {/* Footer Actions */}
      <Divider />
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        pt={1.5}
        px={1}
      >
        <Typography variant="caption" color="text.secondary">
          ID: {contract.id}
        </Typography>
        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            size="small"
            color="info"
            onClick={() => onView(contract)}
            sx={{
              minWidth: 36,
              padding: "4px",
              borderRadius: "50%",
              borderColor: "rgba(0,0,0,0.2)",
            }}
          >
            <Visibility fontSize="small" />
          </Button>
          <Button
            variant="outlined"
            size="small"
            color="primary"
            sx={{ textTransform: "none", fontWeight: 500 }}
            onClick={() => onEdit(contract)}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            size="small"
            color="error"
            sx={{ textTransform: "none", fontWeight: 500 }}
            onClick={() => onDelete(contract.id)}
          >
            Delete
          </Button>
          <Button
            variant="outlined"
            size="small"
            color="inherit"
            sx={{ textTransform: "none", fontWeight: 500 }}
          >
            Export
          </Button>
        </Stack>
      </Box>
    </Card>
  );
};

export default ContractCard;
