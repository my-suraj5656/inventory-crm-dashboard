import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectServices,
  deleteServiceVisit,
  updateServiceVisit,
  addServiceVisit,
} from "../redux/slices/serviceSlice";
import { Container, Grid, Typography, Box, Button } from "@mui/material";
import ServiceCard from "../components/Services/ServiceCard";
import ServiceFilter from "../components/Services/ServiceFilter";
import ServiceAddModal from "../components/Services/ServiceAddModal";
import ServiceViewModal from "../components/Services/ServiceViewModal";

const ServicePage = () => {
  const dispatch = useDispatch();
  const services = useSelector(selectServices);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [purposeFilter, setPurposeFilter] = useState("All");
  const [openAddModal, setOpenAddModal] = useState(false);
  const [editServiceData, setEditServiceData] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.deviceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.facilityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.engineer.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || service.status === statusFilter;

    const matchesPurpose =
      purposeFilter === "All" || service.purpose === purposeFilter;

    return matchesSearch && matchesStatus && matchesPurpose;
  });

  const handleDelete = (id) => {
    dispatch(deleteServiceVisit(id));
  };

  const handleUpdate = (updatedService) => {
    dispatch(updateServiceVisit(updatedService));
  };

  const handleAdd = (newService) => {
    dispatch(addServiceVisit(newService));
  };

  const handleEdit = (service) => {
    setEditServiceData(service);
    setOpenAddModal(true);
  };

  const handleView = (service) => {
    setSelectedService(service);
    setViewModalOpen(true);
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
        <Box>
          <Typography variant="h4" fontWeight="bold">
            Service Visits
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage and track device service records
          </Typography>
        </Box>

        <Box
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          alignItems="center"
          gap={2}
        >
          <ServiceFilter
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            purposeFilter={purposeFilter}
            setPurposeFilter={setPurposeFilter}
          />

          <Button
            variant="contained"
            onClick={() => setOpenAddModal(true)}
            sx={{ minWidth: 160, height: 40 }}
          >
            Add Service
          </Button>
        </Box>
      </Box>

      {/* Cards Grid */}
      <Grid container spacing={3}>
        {filteredServices.map((service) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={service.id}
            display="flex"
            justifyContent="center"
          >
            <ServiceCard
              service={service}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
              onEdit={handleEdit}
              onView={handleView}
            />
          </Grid>
        ))}
      </Grid>

      {/* Add / Edit Modal */}
      <ServiceAddModal
        open={openAddModal}
        onClose={() => {
          setOpenAddModal(false);
          setEditServiceData(null);
        }}
        onAdd={handleAdd}
        onUpdate={handleUpdate}
        initialData={editServiceData}
      />

      {/* View Modal */}

      <ServiceViewModal
        open={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        service={selectedService}
      />
    </Container>
  );
};

export default ServicePage;
