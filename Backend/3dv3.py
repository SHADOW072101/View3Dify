import pycolmap
import open3d as o3d
import numpy as np
from pathlib import Path
import logging
import shutil
import subprocess

# Configure logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")

# Configuration
CONFIG = {
    "image_folder": r"D:\App\Backend\uploads",  # Path to the folder containing input images
    "output_folder": r"D:\App\Backend\3dOutput\sparse",  # Path to save output files
    "camera_model": "SIMPLE_RADIAL",  # Camera model for feature extraction
    "poisson_depth": 12,  # Depth parameter for Poisson surface reconstruction
    "normal_estimation_radius": 0.09,  # Radius for normal estimation
    "normal_estimation_max_nn": 30,  # Max neighbors for normal estimation
    "dense_reconstruction": True,  # Enable dense reconstruction
    "texture_mapping": True,  # Enable texture mapping
}

def setup_directories(output_folder, sparse_output_path, dense_output_path):
    """Ensure output directories exist and clean up if necessary."""
    if Path(output_folder).exists():
        logging.info(f"Cleaning up existing output directory: {output_folder}")
        shutil.rmtree(output_folder)
    Path(output_folder).mkdir(parents=True, exist_ok=True)
    Path(sparse_output_path).mkdir(parents=True, exist_ok=True)
    Path(dense_output_path).mkdir(parents=True, exist_ok=True)

# def extract_features(database_path, image_folder, camera_model):
#     """Extract features from images."""
#     logging.info("Extracting features...")
#     pycolmap.extract_features(
#         database_path=str(database_path),
#         image_path=str(image_folder),
#         camera_model=camera_model
#     )

def extract_features(database_path, image_folder, camera_model):
    """Run feature extraction using COLMAP command line."""
    colmap_path = r"D:\photogramatory\colmap-x64-windows-cuda\COLMAP.bat"  # Adjust this path!
    
    logging.info("Running COLMAP feature extractor with GPU...")
    subprocess.run([
        colmap_path, "feature_extractor",
        "--database_path", str(database_path),
        "--image_path", str(image_folder),
        "--ImageReader.camera_model", camera_model,
        "--SiftExtraction.use_gpu", "1",
        "--SiftExtraction.gpu_index", "0"
    ], check=True)

def match_features(database_path):
    """Match features using exhaustive matching."""
    logging.info("Performing exhaustive matching...")
    pycolmap.match_exhaustive(database_path=str(database_path))

def run_incremental_mapping(database_path, image_folder, sparse_output_path):
    """Run incremental mapping for SfM."""
    logging.info("Running Incremental SfM...")
    return pycolmap.incremental_mapping(
        database_path=str(database_path),
        image_path=str(image_folder),
        output_path=str(sparse_output_path)
    )

def save_reconstruction(reconstruction, model_subdir):
    """Save reconstruction model and generate mesh."""
    model_subdir.mkdir(parents=True, exist_ok=True)
    logging.info(f"Saving model to: {model_subdir}")

    try:
        reconstruction.write(str(model_subdir))
        logging.info(f"Model saved successfully to {model_subdir}")

        points_3d = reconstruction.points3D
        logging.info(f"Extracted {len(points_3d)} 3D points.")

        points = np.array([p.xyz for p in points_3d.values()])
        point_cloud = o3d.geometry.PointCloud()
        point_cloud.points = o3d.utility.Vector3dVector(points)

        point_cloud.estimate_normals(
            search_param=o3d.geometry.KDTreeSearchParamHybrid(
                radius=CONFIG["normal_estimation_radius"],
                max_nn=CONFIG["normal_estimation_max_nn"]
            )
        )

        logging.info("Generating mesh...")
        mesh, densities = o3d.geometry.TriangleMesh.create_from_point_cloud_poisson(
            point_cloud, depth=CONFIG["poisson_depth"]
        )

        mesh_file = r"D:\App\Backend\output\mesh.obj"
        preViewFile = r"D:\App\Backend\output\preView.gltf"
        o3d.io.write_triangle_mesh(str(mesh_file), mesh)
        o3d.io.write_triangle_mesh(str(preViewFile), mesh)
        logging.info(f"Mesh saved to: {mesh_file}")

    except Exception as e:
        logging.error(f"Failed to save model: {e}")

# def run_dense_reconstruction(image_folder, sparse_output_path, dense_output_path):
#     """Run dense reconstruction using COLMAP command-line tools."""
#     logging.info("Running dense reconstruction...")
    
#     # Step 1: Image undistortion
#     subprocess.run([
#         "colmap", "image_undistorter",
#         "--image_path", str(image_folder),
#         "--input_path", str(sparse_output_path /"model_0"),
#         "--output_path", str(dense_output_path)
#     ])
    
#     # Step 2: PatchMatch Stereo
#     subprocess.run([
#         "colmap", "patch_match_stereo",
#         "--workspace_path", str(dense_output_path)
#     ])
    
#     # Step 3: Stereo Fusion
#     subprocess.run([
#         "colmap", "stereo_fusion",
#         "--workspace_path", str(dense_output_path),
#         "--output_path", str(dense_output_path / "fused.ply")
#     ])
    
#     # Step 4: Poisson Meshing
#     subprocess.run([
#         "colmap", "poisson_mesher",
#         "--input_path", str(dense_output_path / "fused.ply"),
#         "--output_path", str(dense_output_path / "mesh.ply")
#     ])
    
#     logging.info("Dense reconstruction completed.")

# def run_dense_reconstruction(image_folder, sparse_path, dense_path):
#     """Robust dense reconstruction with error handling"""
#     # Use absolute paths to avoid any path issues
#     image_folder = Path(image_folder).absolute()
#     sparse_path = Path(sparse_path).absolute()
#     dense_path = Path(dense_path).absolute()
    
#     # Try different COLMAP executable locations
#     colmap_exes = [
#         "colmap",  # If in PATH
#         r"D:\photogramatory\colmap-x64-windows-cuda\COLMAP.bat",
#         r"C:\Program Files\COLMAP\colmap.exe",
#         r"C:\COLMAP\colmap.exe",
#     ]
    
#     for colmap_exe in colmap_exes:
#         try:
#             print(f"Trying COLMAP at: {colmap_exe}")
            
#             # 1. Image Undistortion
#             subprocess.run(
#                 [colmap_exe, "image_undistorter",
#                  "--image_path", str(image_folder),
#                  "--input_path", str(sparse_path / "0"),  # Note the / "0" for model folder
#                  "--output_path", str(dense_path)],
#                 check=True
#             )
            
#             # 2. Patch Match Stereo
#             subprocess.run(
#                 [colmap_exe, "patch_match_stereo",
#                  "--workspace_path", str(dense_path)],
#                 check=True
#             )
            
#             # 3. Stereo Fusion
#             subprocess.run(
#                 [colmap_exe, "stereo_fusion",
#                  "--workspace_path", str(dense_path),
#                  "--output_path", str(dense_path / "fused.ply")],
#                 check=True
#             )
            
#             print("Dense reconstruction completed successfully")
#             return True
            
#         except FileNotFoundError:
#             continue
#         except subprocess.CalledProcessError as e:
#             print(f"COLMAP error: {e}")
#             return False
    
#     print("Could not find COLMAP executable in any standard location")
#     return False

# def run_texture_mapping(image_folder, dense_output_path):
#     """Project textures onto the mesh using Open3D."""
#     logging.info("Running texture mapping...")
#     mesh = o3d.io.read_triangle_mesh(str(dense_output_path / "mesh.ply"))
#     texture_images = [str(image) for image in Path(image_folder).glob("*.jpg")]

#     # Create a textured mesh
#     textured_mesh = o3d.geometry.TriangleMesh.create_from_point_cloud_poisson(
#         mesh, texture_images
#     )

#     # Save the textured mesh
#     textured_mesh_file = dense_output_path / "textured_mesh.ply"
#     o3d.io.write_triangle_mesh(str(textured_mesh_file), textured_mesh)
#     logging.info(f"Textured mesh saved to: {textured_mesh_file}")

def main():
    """Main function to run the photogrammetry pipeline."""
    image_folder = Path(CONFIG["image_folder"])
    output_folder = Path(CONFIG["output_folder"])
    database_path = output_folder / "colmap.db"
    sparse_output_path = output_folder / "sparse"
    dense_output_path = output_folder / "dense"

    setup_directories(output_folder, sparse_output_path, dense_output_path)

    try:
        # Step 1: Feature extraction
        extract_features(database_path, image_folder, CONFIG["camera_model"])

        # Step 2: Feature matching
        match_features(database_path)

        # Step 3: Sparse reconstruction (SfM)
        reconstruction_manager = run_incremental_mapping(
            database_path, image_folder, sparse_output_path
        )

        if isinstance(reconstruction_manager, dict):
            logging.info(f"Reconstruction manager contains {len(reconstruction_manager)} models.")
            for i, reconstruction in reconstruction_manager.items():
                model_subdir = sparse_output_path / f"model_{i}"
                save_reconstruction(reconstruction, model_subdir)
        else:
            logging.error(f"Unexpected return type from incremental_mapping: {type(reconstruction_manager)}")

        # Step 4: Dense reconstruction (optional)
        if CONFIG["dense_reconstruction"]:
            logging.info(f"Performing Dence reconstruction")
            # run_dense_reconstruction(image_folder, sparse_output_path, dense_output_path)

        # Step 5: Texture mapping (optional)
        if CONFIG["texture_mapping"] and CONFIG["dense_reconstruction"]:
            logging.info(f"Performing texture mapping")
            # run_texture_mapping(image_folder, dense_output_path)

    except Exception as e:
        logging.error(f"An error occurred during the photogrammetry pipeline: {e}")

if __name__ == "__main__":
    main()