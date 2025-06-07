import subprocess
import json
import time
from pathlib import Path
import logging
import shutil

# Configure logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")

class MeshroomPipeline:
    def __init__(self, config):
        self.config = config
        self.image_dir = Path(config["image_folder"])
        self.output_dir = Path(config["output_folder"])
        self.meshroom_cli = config.get("meshroom_cli", "meshroom_photogrammetry")  # Meshroom CLI command
        meshroom_bin = Path(config["meshroom_cli"])
        self.meshroom_cli = str(meshroom_bin.parent / "meshroom_batch.exe")
        
        # Ensure output directory exists
        self.output_dir.mkdir(parents=True, exist_ok=True)

    def run_meshroom(self):
        """Run Meshroom's photogrammetry pipeline via command line."""
        logging.info("Starting Meshroom processing...")
        
        cmd = [
        self.meshroom_cli,
        "--input", str(self.image_dir),
        "--output", str(self.output_dir),
        "--pipeline", self.config.get("pipeline", "photogrammetry"),
        "--forceStatus",  # Recompute all nodes
        "--forceCompute",
        
        ]
        
        
        try:
            # Run Meshroom CLI
            subprocess.run(cmd, check=True)
            logging.info("Meshroom processing completed successfully!")
            return True
        except subprocess.CalledProcessError as e:
            logging.error(f"Meshroom failed: {e}")
            return False

    def convert_mesh_to_gltf(self):
        """Convert Meshroom's output to glTF (optional)."""
        import open3d as o3d
        
        mesh_path = self.output_dir / "texturedMesh.obj"  # Meshroom typically exports OBJ
        if not mesh_path.exists():
            logging.warning("No mesh found in output directory.")
            return False
        
        # Load and convert using Open3D
        mesh = o3d.io.read_triangle_mesh(str(mesh_path))
        gltf_path =  r"D:\App\Backend\output\output.gltf"
        o3d.io.write_triangle_mesh(str(gltf_path), mesh)
        
        logging.info(f"Converted mesh to glTF: {gltf_path}")
        return gltf_path

    def run_full_pipeline(self):
        """Run the complete Meshroom pipeline."""
        if not self.run_meshroom():
            return False
        self.convert_mesh_to_gltf()
        
        return True
    
    
    

# Configuration
CONFIG = {
    "image_folder": r"D:\App\Backend\uploads",
    "output_folder": r"D:\App\Backend\output",
    "meshroom_cli": r"D:\photogramatory\Meshroom-2023.3.0\meshroom_batch.exe",  # Directly specify
    "pipeline": "photogrammetry",
    "convert_to_gltf": True
}

def setup_directories():
        """Ensure output directories exist and clean up if necessary."""
        catch=r"D:\App\Backend\catch"
        output_folder=r"D:\App\Backend\output"
        # image_folder=r"D:\App\Backend\uploads"
        
        logging.info("Cleaning up existing output directory: ")
        shutil.rmtree(catch)
        shutil.rmtree(output_folder)
        # shutil.rmtree(image_folder)
        Path(catch).mkdir(parents=True, exist_ok=True)
        Path(output_folder).mkdir(parents=True, exist_ok=True)
        # Path(image_folder).mkdir(parents=True, exist_ok=True)

    
if __name__ == "__main__":
    setup_directories()
    pipeline = MeshroomPipeline(CONFIG)
    success = pipeline.run_full_pipeline()
    if success:
        logging.info("✅ Pipeline completed successfully!")
    else:
        logging.error("❌ Pipeline failed.")