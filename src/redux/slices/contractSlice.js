import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contracts: [
    {
      id: "CONT001",
      deviceId: "DEV001",
      deviceType: "Patient Monitor",
      facilityName: "City General Hospital",
      type: "AMC",
      startDate: "2024-01-15",
      endDate: "2025-01-15",
      status: "Active",
      value: 5000,
      terms:
        "Annual maintenance contract including quarterly preventive maintenance",
      contactPerson: "Dr. Emily Carter",
    },
    {
      id: "CONT002",
      deviceId: "DEV002",
      deviceType: "Ventilator",
      facilityName: "Metro Medical Center",
      type: "CMC",
      startDate: "2024-02-10",
      endDate: "2024-08-10",
      status: "Expiring Soon",
      value: 8000,
      terms: "Comprehensive maintenance contract with 24/7 support",
      contactPerson: "Dr. Robert Lee",
    },
    {
      id: "CONT003",
      deviceId: "DEV003",
      deviceType: "X-Ray Machine",
      facilityName: "City General Hospital",
      type: "AMC",
      startDate: "2024-03-05",
      endDate: "2025-03-05",
      status: "Active",
      value: 12000,
      terms: "Annual maintenance with bi-annual calibration services",
      contactPerson: "Dr. Emily Carter",
    },
    {
      id: "CONT004",
      deviceId: "DEV004",
      deviceType: "Ultrasound Machine",
      facilityName: "Metro Medical Center",
      type: "CMC",
      startDate: "2024-01-20",
      endDate: "2024-07-20",
      status: "Expiring Soon",
      value: 6500,
      terms: "Comprehensive maintenance including software updates",
      contactPerson: "Dr. Robert Lee",
    },
    {
      id: "CONT005",
      deviceId: "DEV005",
      deviceType: "Defibrillator",
      facilityName: "City General Hospital",
      type: "AMC",
      startDate: "2023-12-10",
      endDate: "2024-12-10",
      status: "Active",
      value: 3500,
      terms: "Annual maintenance with battery replacement included",
      contactPerson: "Dr. Emily Carter",
    },
  ],
};

const contractSlice = createSlice({
  name: "contracts",
  initialState,
  reducers: {
    addContract: (state, action) => {
      state.contracts.push(action.payload);
    },
    updateContract: (state, action) => {
      const index = state.contracts.findIndex(
        (contract) => contract.id === action.payload.id
      );
      if (index !== -1) {
        state.contracts[index] = {
          ...state.contracts[index],
          ...action.payload,
        };
      }
    },
    deleteContract: (state, action) => {
      state.contracts = state.contracts.filter(
        (contract) => contract.id !== action.payload
      );
    },
  },
});

export const { addContract, updateContract, deleteContract } =
  contractSlice.actions;

export const selectContracts = (state) => state.contracts.contracts;
export default contractSlice.reducer;
