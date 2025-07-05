import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addDevice,
  deleteDevice,
  selectDevices,
  updateDevice,
} from "../redux/slices/deviceSlice";
import DeviceFilter from "../components/DeviceInventory/DeviceFilter";
import { Grid, Box, Typography, Container } from "@mui/material";
import DeviceCard from "../components/DeviceInventory/DeviceCard";
import DeviceAddModal from "../components/DeviceInventory/DeviceAddModal"; // ✅ Import Modal
import DeviceUpdateModal from "../components/DeviceInventory/DeviceUpdate";
import DeviceViewModal from "../components/DeviceInventory/DeviceViewModal";

const InventoryPage = () => {
  const dispatch = useDispatch();
  const devices = useSelector(selectDevices);

  const [searchTerm, setsearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [openAddModal, setOpenAddModal] = useState(false); // Modal control
  const [editDevice, setEditDevice] = useState(null);
  const [viewDevice, setViewDevice] = useState(null);

  const filteredDevices = devices.filter((device) => {
    const matchesSearch =
      device.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.facility.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || device.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDelete = (id) => {
    dispatch(deleteDevice(id));
  };

  const handleAddDevice = () => {
    setOpenAddModal(true); //  Show modal
  };

  const handlesubmit = (device) => {
    dispatch(addDevice(device));
  };

  const handleUpdate = (updatedDevice) => {
    dispatch(updateDevice(updatedDevice));
  };

  const handleEdit = (device) => setEditDevice(device);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        gap={2}
        mb={3}
      >
        <Box>
          <Typography variant="h4" fontWeight="bold">
            Device Inventory
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage all medical devices and their status
          </Typography>
        </Box>
        <DeviceFilter
          searchTerm={searchTerm}
          setsearchTerm={setsearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          onAddDevice={handleAddDevice} //  Trigger modal
        />
      </Box>

      <Grid container spacing={3} justifyContent="center">
        {filteredDevices.length > 0 ? (
          filteredDevices.map((device) => (
            <Grid item key={device.id}>
              <DeviceCard
                device={device}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onView={() => setViewDevice(device)}
              />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography>No matching devices found.</Typography>
          </Grid>
        )}
      </Grid>

      {/*view modal */}
      <DeviceViewModal
        open={!!viewDevice}
        onClose={() => setViewDevice(null)}
        device={viewDevice}
      />

      {/* Add Device Modal */}
      <DeviceAddModal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        onAdd={handlesubmit}
      />

      {/* update modal */}
      <DeviceUpdateModal
        open={!!editDevice}
        device={editDevice}
        onClose={() => setEditDevice(null)}
        onUpdate={handleUpdate}
      />
    </Container>
  );
};

export default InventoryPage;
