# Hospital Patient Management System

A full-stack hospital management web application built using **Flask, MongoDB, React, and Tailwind CSS**.

This application allows hospitals to efficiently manage patient records with real-time updates, filtering, status tracking, and downloadable medical reports.

---

## Tech Stack

### 🔹 Backend

- Flask (Python)
- MongoDB
- PyMongo
- Flask-CORS

### 🔹 Frontend

- React (Vite)
- Tailwind CSS
- Axios
- React Router
- html2pdf.js
- React Hot Toast

---

## Features

### Patient Management

- Add new patient records
- Update existing patient details
- Delete patient records
- Automatically load patients on startup

### Patient Table (Right Panel)

- Search / filter by disease
- Status toggle:
  - 🟡 Waiting
  - 🔵 Admitted
  - 🟢 Discharged

- Horizontally scrollable responsive table
- Real-time updates after edit/delete

### Detailed Report Page

- View complete patient information
- View old medical records (optional section)
- Export patient report to PDF

### UI Features

- Dark / Light Mode Toggle
- Fully styled Tailwind UI
- Professional bluish theme
- Resizable 50/50 split layout
- Smooth transitions & animations
- Custom scrollbar styling

---

## 🗂 Project Structure

```
hosp-2/
│
├── backend/
│   ├── config.py
│   ├── app.py
│   ├── routes/
│   │     └── patient_routes.py
│   ├── utils/
│   │     └── serializer.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │    ├── components/
│   │    │     ├── PatientForm.jsx
│   │    │     ├── PatientTable.jsx
│   │    │
│   │    ├── pages/
│   │    │     ├── Dashboard.jsx
│   │    │     └── Report.jsx
│   │    ├── api/
│   │    │     └── patientApi.js
│   │    └── main.jsx
│   └── package.json
│
└── README.md
```

---

## Installation & Setup

### 1️ Clone Repository

```
git clone https://github.com/YOUR_USERNAME/hospital-patient-management.git
cd hospital-patient-management
```

---

## 🔹 Backend Setup

```
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

Backend runs on:

```
http://127.0.0.1:5000
```

---

## 🔹 Frontend Setup

```
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## 🧠 API Endpoints

| Method | Endpoint       | Description        |
| ------ | -------------- | ------------------ |
| GET    | /patients      | Get all patients   |
| GET    | /patients/<id> | Get single patient |
| POST   | /patients      | Add patient        |
| PUT    | /patients/<id> | Update patient     |
| DELETE | /patients/<id> | Delete patient     |

---

## 📌 Patient Fields

Main Details:

- Date & Time
- Name
- Age (Years / Months)
- Contact
- Address
- Symptoms
- Temperature
- Blood Pressure
- Disease
- Doctor
- Medication
- Notes
- Status

Optional:

- Old medical record (previous diagnosis)

---

## 🎯 Highlights

- Fully responsive UI
- Real-time state updates
- Clean REST API architecture
- MongoDB ObjectId handling
- Dark mode fully styled
- PDF export functionality

---

## 👩‍💻 Author

**Likhitha Sanjana**
Full Stack Developer
Tech: Flask | MongoDB | React | Tailwind

---
