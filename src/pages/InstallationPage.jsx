import React, { useState } from "react";
import { Container, Grid, Typography, Box, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  selectInstallations,
  deleteInstallation,
  updateInstallation,
  addInstallation,
} from "../redux/slices/installationSlice";
import InstallationCard from "../components/Installation/InstallationCard";
import InstallationFilter from "../components/Installation/InstallationFilter";
import InstallationAddModal from "../components/Installation/InstallationAddModal";

const Installation = () => {
  const dispatch = useDispatch();
  const installations = useSelector(selectInstallations);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [openAddModal, setOpenAddModal] = useState(false);

  const filteredInstallations = installations.filter((inst) => {
    const matchesSearch =
      inst.deviceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inst.facilityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inst.engineer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || inst.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDelete = (id) => {
    dispatch(deleteInstallation(id));
  };

  const handleUpdate = (updatedInstallation) => {
    dispatch(updateInstallation(updatedInstallation));
  };

  const handleAdd = (newInstallation) => {
    dispatch(addInstallation(newInstallation));
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "stretch", md: "center" }}
        gap={2}
        mb={3}
      >
        <Box flex={1}>
          <Typography variant="h4" fontWeight="bold">
            Installation & Training
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage and track device installations
          </Typography>
        </Box>

        <Box
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          alignItems="center"
          gap={2}
          width={{ xs: "100%", sm: "auto" }}
        >
          <InstallationFilter
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />
          <Button
            variant="contained"
            onClick={() => setOpenAddModal(true)}
            sx={{
              height: "40px",
              minWidth: "160px",
              whiteSpace: "nowrap",
            }}
          >
            Add Installation
          </Button>
        </Box>
      </Box>

      {/* Cards Grid */}
      <Grid container spacing={4} py={4} justifyContent="center">
        {filteredInstallations.map((inst) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={inst.id}
            sx={{ display: "flex" }}
          >
            <InstallationCard
              inst={inst}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          </Grid>
        ))}
      </Grid>

      {/* Add Modal */}
      <InstallationAddModal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        onAdd={handleAdd}
      />
    </Container>
  );
};

export default Installation;
