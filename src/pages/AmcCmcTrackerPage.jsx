// src/pages/AmcCmcTrackerPage.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Container, Typography, Box, Button } from "@mui/material";
import {
  addContract,
  deleteContract,
  updateContract,
  selectContracts,
} from "../redux/slices/contractSlice";
import ContractCard from "../components/Contracts/ContractCard";
import ContractFilter from "../components/Contracts/ContractFilter";
import ContractViewModal from "../components/Contracts/ContractViewModal";
import ContractAddUpdate from "../components/Contracts/ContractAddUpdate";

const AmcCmcTrackerPage = () => {
  const contracts = useSelector(selectContracts);
  const dispatch = useDispatch();

  const [selectedType, setSelectedType] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedContract, setSelectedContract] = useState(null);

  const handleView = (contract) => {
    setSelectedContract(contract);
    setViewModalOpen(true);
  };

  const handleAddClick = () => {
    setAddModalOpen(true);
  };

  const handleEditClick = (contract) => {
    setSelectedContract(contract);
    setEditModalOpen(true);
  };

  const handleAddContract = (newContract) => {
    dispatch(addContract(newContract));
  };

  const handleUpdateContract = (updatedContract) => {
    dispatch(updateContract(updatedContract));
  };

  const handleDelete = (id) => {
    dispatch(deleteContract(id));
  };

  const filteredContracts = contracts.filter((contract) => {
    const matchesType =
      selectedType === "All" || contract.type === selectedType;
    const matchesStatus =
      selectedStatus === "All" || contract.status === selectedStatus;
    const matchesSearch =
      contract.deviceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.facilityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.contactPerson.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesStatus && matchesSearch;
  });

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header + Filter Layout */}
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "stretch", md: "center" }}
        gap={2}
        mb={3}
      >
        {/* Title */}
        <Box>
          <Typography variant="h4" fontWeight="bold">
            AMC/CMC Tracker
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Filter and track maintenance contracts
          </Typography>
        </Box>

        {/* Filters + Button */}
        <Box
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          alignItems="center"
          gap={2}
        >
          <ContractFilter
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            type={selectedType}
            onTypeChange={setSelectedType}
            status={selectedStatus}
            onStatusChange={setSelectedStatus}
          />

          <Button
            variant="contained"
            sx={{ minWidth: 160, height: 40 }}
            onClick={handleAddClick}
          >
            Add Contract
          </Button>
        </Box>
      </Box>

      {/* Contract Cards */}
      <Grid container spacing={3} justifyContent="center">
        {filteredContracts.map((contract) => (
          <Grid
            item
            key={contract.id}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ContractCard
              contract={contract}
              onView={handleView}
              onDelete={handleDelete}
              onEdit={handleEditClick}
            />
          </Grid>
        ))}
      </Grid>

      <ContractViewModal
        open={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        contract={selectedContract}
      />

      <ContractAddUpdate
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAdd={handleAddContract}
        mode="add"
      />

      <ContractAddUpdate
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onUpdate={handleUpdateContract}
        mode="edit"
        initialData={selectedContract}
      />
    </Container>
  );
};

export default AmcCmcTrackerPage;
