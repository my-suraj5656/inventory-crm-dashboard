import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  records: [
    {
      id: "ALRT001",
      deviceId: "DEV001",
      facility: "City Hospital",
      date: "2025-07-04",
      issue: "Device screen cracked",
      reportedBy: "Engineer A",
      photos: ["photo_url1", "photo_url2"],
      status: "Pending",
    },
  ],
};

const alertsSlice = createSlice({
  name: "alerts",
  initialState,
  reducers: {
    addAlert: (state, action) => {
      state.records.push(action.payload);
    },
    deleteAlert: (state, action) => {
      state.records = state.records.filter((a) => a.id !== action.payload);
    },
    updateAlert: (state, action) => {
      const index = state.records.findIndex((a) => a.id === action.payload.id);
      if (index !== -1) state.records[index] = action.payload;
    },
  },
});

export const { addAlert, deleteAlert, updateAlert } = alertsSlice.actions;
export default alertsSlice.reducer;
