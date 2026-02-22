import { useState, useEffect } from "react";

export default function PatientForm({ onAddPatient, editData }) {
  const initialState = {
    datetime: "",
    name: "",
    age: "",
    ageType: "Years",
    contact: "",
    address: "",
    symptoms: "",
    temperature: "",
    bp: "",
    disease: "",
    doctor: "",
    medication: "", // ✅ NEW
    notes: "",
    oldRecord: {
      datetime: "",
      doctor: "",
      disease: "",
      symptoms: "",
      medication: "", // ✅ NEW
      notes: "",
    },
    status: "Waiting",
  };

  const [formData, setFormData] = useState(initialState);
  const [showOldRecord, setShowOldRecord] = useState(false);

  useEffect(() => {
    if (editData) {
      setFormData({
        ...editData,
        oldRecord: {
          datetime: editData.oldRecord?.datetime || "",
          doctor: editData.oldRecord?.doctor || "",
          disease: editData.oldRecord?.disease || "",
          symptoms: editData.oldRecord?.symptoms || "",
          medication: editData.oldRecord?.medication || "",
          notes: editData.oldRecord?.notes || "",
        },
      });

      if (editData.oldRecord?.datetime) {
        setShowOldRecord(true);
      }
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("old_")) {
      const key = name.replace("old_", "");
      setFormData((prev) => ({
        ...prev,
        oldRecord: {
          ...prev.oldRecord,
          [key]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPatient(formData);
    setFormData(initialState);
    setShowOldRecord(false);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-blue-800 mb-6">
        {editData ? "Update Patient" : "Add Patient"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="datetime-local"
          name="datetime"
          required
          value={formData.datetime}
          onChange={handleChange}
          className="input"
        />

        <input
          type="text"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          placeholder="Patient Name"
          className="input"
        />

        <div className="flex gap-2">
          <input
            type="number"
            name="age"
            required
            value={formData.age}
            onChange={handleChange}
            placeholder="Age"
            className="input w-2/3"
          />

          <select
            name="ageType"
            value={formData.ageType}
            onChange={handleChange}
            className="input w-1/3"
          >
            <option>Years</option>
            <option>Months</option>
          </select>
        </div>

        <input
          type="text"
          name="contact"
          required
          value={formData.contact}
          onChange={handleChange}
          placeholder="Contact"
          className="input"
        />

        <textarea
          name="address"
          required
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
          className="input"
        />

        <textarea
          name="symptoms"
          required
          value={formData.symptoms}
          onChange={handleChange}
          placeholder="Symptoms"
          className="input"
        />

        <input
          type="number"
          name="temperature"
          required
          value={formData.temperature}
          onChange={handleChange}
          placeholder="Temperature (°C)"
          className="input"
        />

        <input
          type="text"
          name="bp"
          required
          value={formData.bp}
          onChange={handleChange}
          placeholder="Blood Pressure (120/80)"
          className="input"
        />

        <input
          type="text"
          name="disease"
          required
          value={formData.disease}
          onChange={handleChange}
          placeholder="Disease"
          className="input"
        />

        <input
          type="text"
          name="doctor"
          required
          value={formData.doctor}
          onChange={handleChange}
          placeholder="Doctor In Charge"
          className="input"
        />

        {/* ✅ NEW MEDICATION FIELD */}
        <textarea
          name="medication"
          required
          value={formData.medication}
          onChange={handleChange}
          placeholder="Medication Prescribed"
          className="input"
        />

        <textarea
          name="notes"
          required
          value={formData.notes}
          onChange={handleChange}
          placeholder="Doctor Notes"
          className="input"
        />

        {/* OPTIONAL OLD RECORD */}
        <button
          type="button"
          onClick={() => setShowOldRecord(!showOldRecord)}
          className="text-blue-600 font-semibold"
        >
          {showOldRecord
            ? "Hide Old Record"
            : "Add Old Medical Record (Optional)"}
        </button>

        {showOldRecord && (
          <div className="border border-blue-200 rounded-xl p-4 space-y-3 bg-blue-50">
            <input
              type="datetime-local"
              name="old_datetime"
              value={formData.oldRecord?.datetime || ""}
              onChange={handleChange}
              className="input"
            />

            <input
              type="text"
              name="old_doctor"
              value={formData.oldRecord?.doctor || ""}
              onChange={handleChange}
              placeholder="Old Doctor"
              className="input"
            />

            <input
              type="text"
              name="old_disease"
              value={formData.oldRecord?.disease || ""}
              onChange={handleChange}
              placeholder="Old Disease"
              className="input"
            />

            <textarea
              name="old_symptoms"
              value={formData.oldRecord?.symptoms || ""}
              onChange={handleChange}
              placeholder="Old Symptoms"
              className="input"
            />

            {/* ✅ OLD MEDICATION */}
            <textarea
              name="old_medication"
              value={formData.oldRecord?.medication || ""}
              onChange={handleChange}
              placeholder="Old Medication"
              className="input"
            />

            <textarea
              name="old_notes"
              value={formData.oldRecord?.notes || ""}
              onChange={handleChange}
              placeholder="Old Notes"
              className="input"
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold transition hover:bg-blue-700 hover:scale-105"
        >
          {editData ? "Update Patient" : "Save Patient"}
        </button>
      </form>
    </div>
  );
}
