import React from "react";
import { useSelector } from "react-redux";
import { Grid, Paper, Typography, Box, Divider } from "@mui/material";
import {
  MonitorHeart,
  Settings,
  EventNote,
  TrendingUp,
  WarningAmber,
  Shield,
} from "@mui/icons-material";

// Stat card component
const StatCard = ({ title, value, subtitle, icon: Icon, color }) => (
  <Paper elevation={3} sx={{ p: 3, display: "flex", gap: 2 }}>
    <Icon fontSize="large" sx={{ color }} />
    <Box>
      <Typography variant="subtitle1">{title}</Typography>
      <Typography variant="h5" fontWeight="bold">
        {value}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {subtitle}
      </Typography>
    </Box>
  </Paper>
);

const DashboardPage = () => {
  // Redux state
  const devices = useSelector((state) => state.device?.devices || []);
  const contracts = useSelector((state) => state.contracts?.contracts || []);
  const services = useSelector((state) => state.services?.visits || []);
  const installations = useSelector(
    (state) => state.installations?.installations || []
  );
  const alerts = useSelector((state) => state.alerts?.records || []);

  // Stats
  const totalDevices = devices.length;
  const onlineDevices = devices.filter((d) => d.status === "Online").length;
  const activeContracts = contracts.filter((c) => c.status === "Active").length;
  const pendingServices = services.filter(
    (s) => s.status === "Scheduled" || s.status === "In Progress"
  ).length;
  const pendingInstalls = installations.filter(
    (i) => i.status !== "Completed"
  ).length;
  const openAlerts = alerts.filter((a) => a.status === "Pending").length;

  return (
    <Box p={4}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Dashboard
      </Typography>
      <Typography color="text.secondary" gutterBottom>
        Medical Device CRM & Inventory Overview
      </Typography>

      {/* Stats */}
      {/* Stats */}
      <Grid container spacing={3} sx={{ my: 2 }}>
        {[
          {
            title: "Total Devices",
            value: totalDevices,
            subtitle: "Across all facilities",
            icon: MonitorHeart,
            color: "primary.main",
          },
          {
            title: "Online Devices",
            value: `${onlineDevices}/${totalDevices}`,
            subtitle: `${
              totalDevices > 0
                ? Math.round((onlineDevices / totalDevices) * 100)
                : 0
            }% uptime`,
            icon: TrendingUp,
            color: "green",
          },
          {
            title: "Active Contracts",
            value: activeContracts,
            subtitle: "AMC/CMC running",
            icon: Shield,
            color: "purple",
          },
          {
            title: "Pending Services",
            value: pendingServices,
            subtitle: "Scheduled/In progress",
            icon: EventNote,
            color: "orange",
          },
          {
            title: "Pending Installs",
            value: pendingInstalls,
            subtitle: "Installation status",
            icon: Settings,
            color: "info.main",
          },
          {
            title: "Open Alerts",
            value: openAlerts,
            subtitle: "Photo logs + alerts",
            icon: WarningAmber,
            color: "error.main",
          },
        ].map((stat, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <StatCard {...stat} />
          </Grid>
        ))}
      </Grid>

      {/* Panels */}
      <Divider sx={{ my: 3 }} />
      <Grid container spacing={3}>
        {/* Recent Activity */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recent Activity
            </Typography>
            {[...services.slice(-2), ...installations.slice(-2)].map(
              (item, idx) => (
                <Box key={idx} mb={2} pb={1} borderBottom="1px solid #eee">
                  <Typography variant="subtitle2" fontWeight="bold">
                    {item.engineer || item.installer || "Staff"} –{" "}
                    {item.purpose || item.status}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.date || "No date"} —{" "}
                    {item.notes || item.checklistSummary || "Activity logged"}
                  </Typography>
                </Box>
              )
            )}
          </Paper>
        </Grid>

        {/* Alerts Panel */}
        {/* Alerts Panel */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              bgcolor: "#fff4f4",
              border: "1px solid #ffe0e0",
              borderRadius: 2,
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{ color: "error.main", fontWeight: "bold" }}
            >
              🔔 Alerts Panel
            </Typography>

            {alerts.filter((a) => a.status === "Pending").length === 0 ? (
              <Typography variant="body2" color="text.secondary">
                No pending alerts 🎉
              </Typography>
            ) : (
              alerts
                .filter((a) => a.status === "Pending")
                .slice(0, 3)
                .map((alert, index) => (
                  <Box
                    key={index}
                    sx={{
                      mb: 2,
                      p: 2,
                      borderRadius: 2,
                      bgcolor: "#fff",
                      border: "1px solid #f2dede",
                      boxShadow: 1,
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      fontWeight="bold"
                      sx={{ color: "error.main" }}
                    >
                      ⚠️ {alert.deviceId} – {alert.facility}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 0.5 }}
                    >
                      {alert.issue}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.disabled"
                      sx={{ mt: 0.5, display: "block" }}
                    >
                      Reported by: {alert.reportedBy} on {alert.date}
                    </Typography>
                  </Box>
                ))
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;
