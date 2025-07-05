import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  devices: [
    {
      id: "DEV001",
      type: "Patient Monitor",
      facility: "City General Hospital",
      status: "Online",
      batteryLevel: 87,
      lastServiceDate: "2024-06-15",
      installationDate: "2024-01-15",
      amcStatus: "Active",
      cmcStatus: "Active",
    },
    {
      id: "DEV002",
      type: "Ventilator",
      facility: "Metro Medical Center",
      status: "Maintenance",
      batteryLevel: 45,
      lastServiceDate: "2024-06-20",
      installationDate: "2024-02-10",
      amcStatus: "Expiring Soon",
      cmcStatus: "Active",
    },
    {
      id: "DEV003",
      type: "X-Ray Machine",
      facility: "City General Hospital",
      status: "Online",
      batteryLevel: 92,
      lastServiceDate: "2024-06-10",
      installationDate: "2024-03-05",
      amcStatus: "Active",
      cmcStatus: "Expired",
    },
    {
      id: "DEV004",
      type: "Ultrasound Machine",
      facility: "Metro Medical Center",
      status: "Online",
      batteryLevel: 78,
      lastServiceDate: "2024-05-28",
      installationDate: "2024-01-20",
      amcStatus: "Active",
      cmcStatus: "Active",
    },
    {
      id: "DEV005",
      type: "Defibrillator",
      facility: "City General Hospital",
      status: "Offline",
      batteryLevel: 15,
      lastServiceDate: "2024-04-15",
      installationDate: "2023-12-10",
      amcStatus: "Active",
      cmcStatus: "Expiring Soon",
    },
    {
      id: "DEV006",
      type: "Infusion Pump",
      facility: "Metro Medical Center",
      status: "Online",
      batteryLevel: 89,
      lastServiceDate: "2024-06-12",
      installationDate: "2024-02-28",
      amcStatus: "Active",
      cmcStatus: "Active",
    },
  ],
};

const deviceSlice = createSlice({
  name: "device",
  initialState,
  reducers: {
    addDevice: (state, action) => {
      const exists = state.devices.some((d) => d.id === action.payload.id);
      if (!exists) {
        state.devices.unshift(action.payload);
      }
    },
    updateDevice: (state, action) => {
      const index = state.devices.findIndex((d) => d.id === action.payload.id);
      if (index !== -1) {
        state.devices[index] = { ...state.devices[index], ...action.payload };
      }
    },
    deleteDevice: (state, action) => {
      state.devices = state.devices.filter((d) => d.id !== action.payload);
    },
  },
});
export const { addDevice, updateDevice, deleteDevice } = deviceSlice.actions;
export const selectDevices = (state) => state.device.devices;
export default deviceSlice.reducer;
