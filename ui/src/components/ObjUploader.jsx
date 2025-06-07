import React, { useState } from 'react';
// import './styles/fileUploader.css';
import './styles/ObjUploader.css';
import ThreeDViewer from './ThreeDViewer';
import './styles/threeD.css';

const FileUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [modelUrl, setModelUrl] = useState(null);
  const [showViewer, setShowViewer] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setIsFilePicked(true);
      
      // Create a local URL for immediate preview
      const localUrl = URL.createObjectURL(file);
      setModelUrl(localUrl);
      setShowViewer(true);
    }
  };

  return (
    <div className="file-uploader">
      <h2>3D Model Viewer</h2>
      
      {!showViewer ? (
        <div className="obj-upload-box">
          <label htmlFor="obj-file-input" className="obj-file-label">
            {isFilePicked ? selectedFile.name : 'Choose 3D file'}
          </label>
          <input
            id="obj-file-input"
            type="file"
            onChange={handleFileChange}
            className="obj-file-input"
            accept=".obj,.gltf,.glb,.fbx,.stl" // Common 3D file formats
          />
        </div>
      ) : (
        <div className="obj-viewer-container">
          <div className="obj-viewer-controls">
            <button onClick={() => setShowViewer(false)} className="back-button">
              ← Back to Upload
            </button>
            <h3>Viewing: {selectedFile.name}</h3>
          </div>
          
          <div className="three-d-container">
            {modelUrl && <ThreeDViewer modelUrl={modelUrl} />}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploader;