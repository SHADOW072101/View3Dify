from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from flask import Flask, request, jsonify, send_from_directory
import subprocess
import logging
from pathlib import Path
import shutil

# Configuration
UPLOAD_FOLDER = "uploads"
MODEL_UPLOAD_FOLDER = "3duploads"
OUTPUT_FOLDER = "output"
if Path(r"D:\App\Backend\uploads").exists():
    shutil.rmtree(r"D:\App\Backend\uploads")
if Path(r"D:\App\Backend\output").exists():
    shutil.rmtree(r"D:\App\Backend\output")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(OUTPUT_FOLDER, exist_ok=True)


app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configuration
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/upload", methods=["POST"])
def upload_files():
    """Endpoint to handle file uploads."""
    if "files" not in request.files:
        print("No files found in the request.")  # Debugging
        print("Request files:", request.files)  # Debugging
        return jsonify({"error": "No files uploaded"}), 400

    files = request.files.getlist("files")
    if not files:
        print("No files selected.")  # Debugging
        return jsonify({"error": "No files selected"}), 400

    # Save uploaded files
    saved_files = []
    for file in files:
        if file.filename == "":
            continue
        file_path = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(file_path)
        saved_files.append(file.filename)
        print(f"Saved file: {file_path}")  # Debugging

    return jsonify({"message": "Files uploaded successfully", "files": saved_files}), 200

@app.route("/upload3d", methods=["POST"])
def upload_3d_file():  # Changed function name to be unique
    """Endpoint to handle 3D file uploads."""
    if 'file' not in request.files:
        print("No file found in the request.")
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']
    if file.filename == '':
        print("No file selected.")
        return jsonify({"error": "No file selected"}), 400

    # Ensure the upload directory exists
    os.makedirs(MODEL_UPLOAD_FOLDER, exist_ok=True)

    # Save the uploaded file
    file_path = os.path.join(MODEL_UPLOAD_FOLDER, file.filename)
    file.save(file_path)
    print(f"Saved file: {file_path}")

    return jsonify({
        "message": "File uploaded successfully",
        "filename": file.filename,
        "filepath": file_path
    }), 200

@app.route("/run_pipeline", methods=["POST"])
def run_pipeline():
    """Endpoint to run the photogrammetry pipeline."""
    try:
        # Run the photogrammetry pipeline
        logging.info("Starting photogrammetry pipeline...")
        subprocess.run(["python", "3dv3.py", UPLOAD_FOLDER, OUTPUT_FOLDER], check=True)
        logging.info("Pipeline completed successfully.")

        return jsonify({"message": "Pipeline completed successfully"}), 200
    except subprocess.CalledProcessError as e:
        logging.error(f"Pipeline failed: {e}")
        return jsonify({"error": "Pipeline failed"}), 500
    
@app.route("/results", methods=["GET"])
def get_results():
    """Endpoint to retrieve results."""
    results = []
    try:
        for root, _, files in os.walk(OUTPUT_FOLDER):
            for file in files:
                if file.endswith(".gltf"):
                    file_path = os.path.join(root, file)
                    relative_path = os.path.relpath(file_path, OUTPUT_FOLDER)
                    results.append(relative_path)
                    logging.info(f"Found GLTF file: {relative_path}")
        
        if not results:
            logging.warning("No GLTF files found in the output folder.")
        
        return jsonify({"results": results}), 200
    except Exception as e:
        logging.error(f"Error in get_results: {e}", exc_info=True)
        return jsonify({"error": "Internal server error"}), 500
    
OUTPUT_FOLDER = os.path.abspath("output")  # Absolute path to the output folder

# Serve static files from the OUTPUT_FOLDER
@app.route('/output/<path:filename>')
def serve_output(filename):
    file_path = os.path.join(OUTPUT_FOLDER, filename)
    logging.info(f"Serving file: {filename} from {OUTPUT_FOLDER}")  # Log the requested file
    if not os.path.exists(file_path):
        logging.error(f"File not found: {file_path}")
        return "File not found", 404
    return send_from_directory(OUTPUT_FOLDER, filename)



if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)