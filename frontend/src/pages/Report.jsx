import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js";
import { getPatientById } from "../api/patientApi";

export default function Report() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const res = await getPatientById(id);
        setPatient(res.data);
      } catch (err) {
        console.error("Error fetching patient:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, [id]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="h-screen flex items-center justify-center">
        <h1 className="text-red-600 text-xl">Patient not found.</h1>
      </div>
    );
  }

  const handleExport = () => {
    const element = document.getElementById("report-content");

    const options = {
      margin: 0.5,
      filename: `${patient.name}_Medical_Report.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(options).from(element).save();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-8">
      <div
        id="report-content"
        className="max-w-4xl mx-auto bg-white text-black shadow-2xl rounded-2xl p-8"
      >
        <h1 className="text-3xl font-bold text-blue-800 mb-6">
          Patient Full Report
        </h1>

        <div className="grid grid-cols-2 gap-6 text-sm">
          <Detail label="Date & Time" value={patient.datetime} />
          <Detail label="Name" value={patient.name} />
          <Detail label="Age" value={`${patient.age} ${patient.ageType}`} />
          <Detail label="Contact" value={patient.contact} />
          <Detail label="Address" value={patient.address} />
          <Detail label="Temperature" value={`${patient.temperature} °C`} />
          <Detail label="Blood Pressure" value={patient.bp} />
          <Detail label="Disease" value={patient.disease} />
          <Detail label="Doctor" value={patient.doctor} />
          <Detail label="Doctor Notes" value={patient.notes} />
          <Detail label="Medication" value={patient.medication || "N/A"} />
        </div>

        {patient.oldRecord?.datetime && (
          <div className="mt-8 border-t pt-6">
            <h2 className="text-xl font-semibold text-blue-700 mb-4">
              Previous Medical Record
            </h2>

            <div className="grid grid-cols-2 gap-6 text-sm">
              <Detail label="Old Date" value={patient.oldRecord.datetime} />
              <Detail label="Old Doctor" value={patient.oldRecord.doctor} />
              <Detail label="Old Disease" value={patient.oldRecord.disease} />
              <Detail label="Old Symptoms" value={patient.oldRecord.symptoms} />
              <Detail
                label="Old Medication"
                value={patient.oldRecord.medication || "N/A"}
              />
              <Detail label="Old Notes" value={patient.oldRecord.notes} />
            </div>
          </div>
        )}

        {/* ACTION BUTTONS */}
        <div className="mt-8 flex gap-4">
          <button
            onClick={handleExport}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Export to PDF
          </button>

          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <p className="font-semibold text-blue-700">{label}</p>
      <p className="text-gray-700">{value}</p>
    </div>
  );
}
