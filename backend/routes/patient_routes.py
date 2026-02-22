from flask import Blueprint, request, jsonify
from bson import ObjectId
from config import patients_collection
from utils.serializer import serialize_patient

patient_bp = Blueprint("patients", __name__)

@patient_bp.route("/", methods=["GET"])
def get_patients():
    disease = request.args.get("disease")
    if disease:
        patients = patients_collection.find({
            "disease": {"$regex": disease, "$options": "i"}
        })
    else:
        patients = patients_collection.find()

    return jsonify([serialize_patient(p) for p in patients])


@patient_bp.route("/", methods=["POST"])
def add_patient():
    data = request.json
    data["status"] = "Waiting"
    patients_collection.insert_one(data)
    return jsonify({"message": "Patient added"}), 201


@patient_bp.route("/<id>", methods=["GET"])
def get_patient(id):
    try:
        patient = patients_collection.find_one({"_id": ObjectId(id)})
        if not patient:
            return jsonify({"error": "Patient not found"}), 404
        return jsonify(serialize_patient(patient))
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@patient_bp.route("/<id>", methods=["PUT"])
def update_patient(id):
    data = request.json

    if "id" in data:
        del data["id"]

    patients_collection.update_one(
        {"_id": ObjectId(id)},
        {"$set": data}
    )
    return jsonify({"message": "Updated"})


@patient_bp.route("/<id>", methods=["DELETE"])
def delete_patient(id):
    patients_collection.delete_one({"_id": ObjectId(id)})
    return jsonify({"message": "Deleted"})