import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:5000/patients",
});

export const getPatients = (disease) => {
  if (disease) {
    return API.get(`/?disease=${disease}`);
  }
  return API.get("/");
};

export const addPatient = (data) => API.post("/", data);

export const updatePatient = (id, data) => API.put(`/${id}`, data); // ✅ FIXED

export const deletePatient = (id) => API.delete(`/${id}`);

export const getPatientById = (id) => API.get(`/${id}`);
