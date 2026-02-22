def serialize_patient(patient):
    return {
        "id": str(patient["_id"]),
        "datetime": patient.get("datetime"),
        "name": patient.get("name"),
        "age": patient.get("age"),
        "ageType": patient.get("ageType"),
        "contact": patient.get("contact"),
        "address": patient.get("address"),
        "symptoms": patient.get("symptoms"),
        "temperature": patient.get("temperature"),
        "bp": patient.get("bp"),
        "disease": patient.get("disease"),
        "doctor": patient.get("doctor"),
        "medication": patient.get("medication"),   # ✅ ADD THIS
        "notes": patient.get("notes"),
        "status": patient.get("status", "Waiting"),
        "oldRecord": patient.get("oldRecord", {})
    }