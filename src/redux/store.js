import { configureStore } from "@reduxjs/toolkit";
import deviceReducer from "./slices/deviceSlice";
import installationReducer from "./slices/installationSlice";
import serviceReducer from "./slices/serviceSlice";
import contractReducer from "./slices/contractSlice";
import alertsReducer from "./slices/alertSlice";
import authReducer from "./slices/auth";

export const store = configureStore({
  reducer: {
    device: deviceReducer,
    installations: installationReducer,
    services: serviceReducer,
    contracts: contractReducer,
    alerts: alertsReducer,
    auth: authReducer,
  },
});
