import { useState, useEffect, useRef } from "react";
import PatientForm from "../components/PatientForm";
import PatientTable from "../components/PatientTable";
import {
  getPatients,
  addPatient,
  updatePatient,
  deletePatient,
} from "../api/patientApi";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark",
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);
  const [patients, setPatients] = useState([]);
  const [editData, setEditData] = useState(null);
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ LOAD ALL PATIENTS ON PAGE LOAD
  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async (term = "") => {
    try {
      setLoading(true);
      const res = await getPatients(term);
      setPatients(res.data);
    } catch (err) {
      toast.error("Failed to fetch patients");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (patient) => {
    try {
      if (editId) {
        await updatePatient(editId, patient);
        toast.success("Patient Updated");

        setEditId(null);
        setEditData(null);
      } else {
        await addPatient(patient);
        toast.success("Patient Added Successfully");
      }

      await fetchPatients(searchTerm); // IMPORTANT: await here
    } catch (err) {
      console.error("Update Error:", err.response?.data || err.message);
      toast.error("Operation Failed");
    }
  };
  const handleDelete = async (id) => {
    try {
      await deletePatient(id);
      toast.success("Patient Deleted");
      fetchPatients(searchTerm);
    } catch {
      toast.error("Delete Failed");
    }
  };

  const handleEdit = (patient) => {
    setEditData(patient);
    setEditId(patient.id);
  };

  const handleStatusChange = async (patient) => {
    const newStatus =
      patient.status === "Waiting"
        ? "Admitted"
        : patient.status === "Admitted"
          ? "Discharged"
          : "Waiting";

    try {
      await updatePatient(patient.id, { ...patient, status: newStatus });
      fetchPatients(searchTerm);
    } catch {
      toast.error("Status Update Failed");
    }
  };

  const handleSearch = async (term) => {
    setSearchTerm(term);
    fetchPatients(term);
  };

  // ✅ STATISTICS
  const total = patients.length;
  const waiting = patients.filter((p) => p.status === "Waiting").length;
  const admitted = patients.filter((p) => p.status === "Admitted").length;
  const discharged = patients.filter((p) => p.status === "Discharged").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-950 dark:to-gray-900 transition-colors duration-300">
      {/* HEADER */}
      <div className="bg-white dark:bg-gray-900 shadow-md px-8 py-4 flex justify-between items-center transition">
        <h1 className="text-2xl font-bold text-blue-700 dark:text-blue-400">
          🏥 Hospital Patient Management System
        </h1>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-blue-600 dark:bg-gray-700 text-white px-4 py-2 rounded-lg hover:scale-105 transition"
        >
          {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>
      {/* ===== STATS ROW ===== */}
      <div className="grid grid-cols-4 gap-4 p-6">
        <StatCard title="Total" value={total} color="bg-blue-500" />
        <StatCard title="Waiting" value={waiting} color="bg-yellow-400" />
        <StatCard title="Admitted" value={admitted} color="bg-blue-600" />
        <StatCard title="Discharged" value={discharged} color="bg-green-500" />
      </div>

      {/* ===== RESIZABLE SPLIT SECTION ===== */}
      <ResizableSplit
        left={
          <div className="h-full p-6 overflow-y-auto">
            <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 shadow-xl rounded-2xl p-6 transition">
              <PatientForm onAddPatient={handleSubmit} editData={editData} />
            </div>
          </div>
        }
        right={
          <div className="h-full p-6 overflow-y-auto">
            <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 shadow-xl rounded-2xl p-6 transition">
              {loading && (
                <div className="flex justify-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              )}

              <PatientTable
                patients={patients}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onStatusChange={handleStatusChange}
                searchTerm={searchTerm}
                onSearch={handleSearch}
              />
            </div>
          </div>
        }
      />
    </div>
  );
}

// ===== STAT CARD COMPONENT =====
function StatCard({ title, value, color }) {
  return (
    <div className={`text-white p-4 rounded-xl shadow-lg ${color}`}>
      <h3 className="text-sm font-semibold">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

function ResizableSplit({ left, right }) {
  const containerRef = useRef(null);
  const [leftWidth, setLeftWidth] = useState(50); // default 50%

  const handleMouseDown = (e) => {
    e.preventDefault();

    const handleMouseMove = (moveEvent) => {
      const containerWidth = containerRef.current.offsetWidth;
      const newLeftWidth =
        ((moveEvent.clientX - containerRef.current.offsetLeft) /
          containerWidth) *
        100;

      if (newLeftWidth > 20 && newLeftWidth < 80) {
        setLeftWidth(newLeftWidth);
      }
    };

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div ref={containerRef} className="flex h-[calc(100vh-200px)]">
      {/* LEFT */}
      <div style={{ width: `${leftWidth}%` }}>{left}</div>

      {/* DIVIDER */}
      <div
        onMouseDown={handleMouseDown}
        className="w-2 cursor-col-resize bg-gray-300 dark:bg-gray-700 hover:bg-blue-500 active:bg-blue-600 transition-all duration-200"
      ></div>

      {/* RIGHT */}
      <div style={{ width: `${100 - leftWidth}%` }}>{right}</div>
    </div>
  );
}
