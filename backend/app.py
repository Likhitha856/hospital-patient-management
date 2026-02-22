from flask import Flask
from flask_cors import CORS
from routes.patient_routes import patient_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(patient_bp, url_prefix="/patients")

if __name__ == "__main__":
    app.run(debug=True)