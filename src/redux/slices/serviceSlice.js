import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visits: [
    {
      id: "SV001",
      deviceId: "DEV001",
      deviceType: "Patient Monitor",
      facilityName: "City General Hospital",
      date: "2024-06-15",
      engineer: "John Smith",
      purpose: "Preventive",
      status: "Completed",
      notes: "Routine maintenance completed. All systems functioning normally.",
      attachments: [],
      duration: 2,
    },
    {
      id: "SV002",
      deviceId: "DEV002",
      deviceType: "Ventilator",
      facilityName: "Metro Medical Center",
      date: "2024-06-20",
      engineer: "Sarah Johnson",
      purpose: "Breakdown",
      status: "In Progress",
      notes:
        "Issue with ventilator pressure settings. Replacement parts ordered.",
      attachments: [],
      duration: 4,
    },
    {
      id: "SV003",
      deviceId: "DEV003",
      deviceType: "X-Ray Machine",
      facilityName: "City General Hospital",
      date: "2024-06-10",
      engineer: "Mike Wilson",
      purpose: "Preventive",
      status: "Completed",
      notes: "Quarterly maintenance performed. Calibration verified.",
      attachments: ["calibration_report.pdf"],
      duration: 3,
    },
    {
      id: "SV004",
      deviceId: "DEV004",
      deviceType: "Ultrasound Machine",
      facilityName: "Metro Medical Center",
      date: "2024-05-28",
      engineer: "Lisa Chen",
      purpose: "Preventive",
      status: "Completed",
      notes: "Software update applied. Transducer cleaned and tested.",
      attachments: ["test_results.pdf"],
      duration: 2,
    },
    {
      id: "SV005",
      deviceId: "DEV005",
      deviceType: "Defibrillator",
      facilityName: "City General Hospital",
      date: "2024-07-05",
      engineer: "Tom Rodriguez",
      purpose: "Breakdown",
      status: "Scheduled",
      notes: "Battery replacement scheduled due to low charge levels.",
      attachments: [],
      duration: 1,
    },
  ],
  loading: false,
  error: null,
};

const serviceSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    addServiceVisit: (state, action) => {
      state.visits.push(action.payload);
    },
    updateServiceVisit: (state, action) => {
      const index = state.visits.findIndex(
        (visit) => visit.id === action.payload.id
      );
      if (index !== -1) {
        state.visits[index] = action.payload;
      }
    },
    deleteServiceVisit: (state, action) => {
      state.visits = state.visits.filter(
        (visit) => visit.id !== action.payload
      );
    },
  },
});

export const { addServiceVisit, updateServiceVisit, deleteServiceVisit } =
  serviceSlice.actions;

export const selectServices = (state) => state.services.visits;

export default serviceSlice.reducer;
