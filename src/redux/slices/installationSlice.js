import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  installations: [
    {
      id: "INST001",
      deviceId: "DEV001",
      deviceType: "Patient Monitor",
      facilityName: "City General Hospital",
      installationDate: "2024-01-15",
      engineer: "John Smith",
      status: "Completed",
      checklistCompleted: true,
      trainingCompleted: true,
      unboxingPhotos: ["photo1.jpg", "photo2.jpg"],
      trainingNotes:
        "Staff training completed successfully. All operators certified.",
    },
    {
      id: "INST002",
      deviceId: "DEV002",
      deviceType: "Ventilator",
      facilityName: "Metro Medical Center",
      installationDate: "2024-02-10",
      engineer: "Sarah Johnson",
      status: "Completed",
      checklistCompleted: true,
      trainingCompleted: true,
      unboxingPhotos: ["photo3.jpg"],
      trainingNotes:
        "Installation completed. Training provided to respiratory therapy team.",
    },
    {
      id: "INST003",
      deviceId: "DEV004",
      deviceType: "Ultrasound Machine",
      facilityName: "Metro Medical Center",
      installationDate: "2024-01-20",
      engineer: "Lisa Chen",
      status: "Training Pending",
      checklistCompleted: true,
      trainingCompleted: false,
      unboxingPhotos: ["photo4.jpg", "photo5.jpg"],
      trainingNotes:
        "Device installed successfully. Training scheduled for next week.",
    },
    {
      id: "INST004",
      deviceId: "DEV006",
      deviceType: "Infusion Pump",
      facilityName: "Metro Medical Center",
      installationDate: "2024-02-28",
      engineer: "Emma Davis",
      status: "In Progress",
      checklistCompleted: false,
      trainingCompleted: false,
      unboxingPhotos: [],
      trainingNotes:
        "Installation in progress. Waiting for electrical work completion.",
    },
  ],
  loading: false,
  error: null,
};

const installationSlice = createSlice({
  name: "installations",
  initialState,
  reducers: {
    addInstallation: (state, action) => {
      state.installations.unshift(action.payload);
    },
    updateInstallation: (state, action) => {
      const index = state.installations.findIndex(
        (inst) => inst.id === action.payload.id
      );
      if (index !== -1) {
        state.installations[index] = {
          ...state.installations[index],
          ...action.payload,
        };
      }
    },
    deleteInstallation: (state, action) => {
      state.installations = state.installations.filter(
        (inst) => inst.id !== action.payload
      );
    },
  },
});

export const { addInstallation, updateInstallation, deleteInstallation } =
  installationSlice.actions;

export const selectInstallations = (state) => state.installations.installations;

export default installationSlice.reducer;
