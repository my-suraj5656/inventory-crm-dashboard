import React, { useState } from "react";
import { Box, Button, Grid, Typography, Chip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addAlert, deleteAlert } from "../../redux/slices/alertSlice";
import AlertAddModal from "./AlertsAddModal";

const AlertLogList = () => {
  const [openAdd, setOpenAdd] = useState(false);

  const dispatch = useDispatch();
  const alerts = useSelector((state) => state.alerts.records);

  const handleAdd = (data) => {
    dispatch(addAlert(data));
  };

  const handleDelete = (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this alert?"
    );
    if (confirm) {
      dispatch(deleteAlert(id));
    }
  };

  return (
    <Box p={3}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5">Alerts & Photo Logs</Typography>
        <Button variant="contained" onClick={() => setOpenAdd(true)}>
          Add Alert
        </Button>
      </Box>

      <Grid container spacing={2}>
        {alerts.map((alert) => (
          <Grid item key={alert.id} xs={12} md={6} lg={4}>
            <Box border={1} borderRadius={2} p={2}>
              <Typography variant="subtitle1">
                <strong>{alert.deviceId}</strong> - {alert.facility}
              </Typography>
              <Typography variant="body2" mt={1}>
                {alert.issue}
              </Typography>
              <Typography variant="caption" display="block">
                Reported by: {alert.reportedBy}
              </Typography>
              <Typography variant="caption" display="block">
                Date: {alert.date}
              </Typography>
              <Chip label={alert.status} size="small" sx={{ mt: 1 }} />
              <Typography variant="caption" display="block">
                {alert.photos.length} photo(s) attached
              </Typography>

              {/* Delete Button */}
              <Box display="flex" justifyContent="flex-end" mt={1}>
                <Button
                  variant="outlined"
                  size="small"
                  color="error"
                  onClick={() => handleDelete(alert.id)}
                >
                  Delete
                </Button>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>

      <AlertAddModal
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onAdd={handleAdd}
      />
    </Box>
  );
};

export default AlertLogList;
