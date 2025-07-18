# 🏥 Device CRM + Inventory Management Dashboard

A full-featured responsive dashboard built with **React**, **Redux**, and **Material UI** for managing medical device inventory, installations, service visits, AMC/CMC contracts, and facility-level CRM history including training and photo documentation.

---

## 🚀 Features

### 📋 Device Inventory Dashboard

- View devices in card/table layout  
- Key info: Type, ID, Facility, Status (Online/Offline/Maintenance), Battery %, Service/Installation Dates, AMC/CMC status  
- Admins can Add/Edit/Delete devices

### 🧰 Installation & Training Module

- Log installations  
- Upload unboxing photos  
- Add/Edit/Delete/view installations  
- Track training completion, checklist, and notes  

### 🛠️ Service Visit Logs

- Record preventive/breakdown visits  
- Add/Edit/Delete/view visits  
- Include notes, engineer name, date  
- Upload PDFs or images  

### 📑 AMC/CMC Tracker

- Manage contracts  
- Track expiry and renewals  
- Add/Edit/Delete/view contracts  

### 🚨 Alerts & Photo Logs

- Upload issue photos  
- Raise and track alerts  
- Comment and follow up on alerts  

---

## 👥 Role-based Views

| Feature                      | Admin ✅        | Technician ✅   |
|-----------------------------|----------------|----------------|
| View Devices                | ✅              | ✅              |
| Add/Edit/Delete Devices     | ✅              | ❌              |
| Log Installations/Service   | ✅              | ✅              |
| Upload Photos               | ✅              | ✅              |
| Manage AMC/CMC Contracts    | ✅              | ✅              |
| Access Alerts Module        | ✅              | ✅              |

---

## 🧰 Tech Stack

- **ReactJS** — Frontend framework  
- **Redux Toolkit** — Global state management  
- **Material UI** — UI components and theming  
- **SCSS Modules** — Component-level styling  
- **localStorage** — Default persistence layer (login/logout)  
- **Optional**: `json-server` — Mock API for development  

---

## 📦 Project Structure

src/
├── components/
│ ├── Alerts/
│ ├── Contracts/
│ ├── DeviceInventory/
│ ├── Installation/
│ ├── Layout/
│ └── Services/
├── pages/
│ ├── AlertsPage.jsx
│ ├── AmcCmcTrackerPage.jsx
│ ├── DashboardPage.jsx
│ ├── Installation.jsx
│ ├── InventoryPage.jsx
│ ├── LoginPage.jsx
│ └── ServicePage.jsx
├── redux/
│ └── slices/
│ ├── alertSlice.js
│ ├── auth.js
│ ├── contractSlice.js
│ ├── deviceSlice.js
│ ├── installationSlice.js
│ ├── serviceSlice.js
│ └── store.js
├── utils/
├── assets/
└── App.jsx
