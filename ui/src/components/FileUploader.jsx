import React, { useState } from 'react';
import './styles/fileUploader.css';
import ThreeDViewer from './ThreeDViewer';
import './styles/threeD.css';

const FileUploader = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isFilesPicked, setIsFilesPicked] = useState(false);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showViewer, setShowViewer] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      setSelectedFiles(files);
      setIsFilesPicked(true);
      setError(null);
    }
  };

  const handleDownload = async (filename) => {
    try {
      const response = await fetch(`http://localhost:5000/output/${filename}`);
      if (!response.ok) {
        throw new Error('Failed to download file');
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download error:', error);
      setError('Failed to download file');
    }
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      setError('Please select files first.');
      return;
    }

    setLoading(true);
    setProgress(0);
    const formData = new FormData();

    selectedFiles.forEach((file) => {
      formData.append("files", file);
    });

    try {
      // Upload files
      setProgress(20);
      const uploadResponse = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error(`Upload failed: ${uploadResponse.statusText}`);
      }

      const uploadResult = await uploadResponse.json();
      console.log('Upload success:', uploadResult);
      setProgress(40);

      // Run pipeline
      const pipelineResponse = await fetch('http://localhost:5000/run_pipeline', {
        method: 'POST',
      });

      if (!pipelineResponse.ok) {
        throw new Error(`Pipeline failed: ${pipelineResponse.statusText}`);
      }

      const pipelineResult = await pipelineResponse.json();
      console.log('Pipeline result:', pipelineResult);
      setProgress(70);

      // Get results
      const resultsResponse = await fetch('http://localhost:5000/results');
      if (!resultsResponse.ok) {
        throw new Error(`Failed to fetch results: ${resultsResponse.statusText}`);
      }

      const resultsData = await resultsResponse.json();
      setResults(resultsData.results);
      setProgress(90);

      if (resultsData.results.length > 0) {
        setShowViewer(true);
      }

      setProgress(100);
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
      setTimeout(() => setProgress(0), 2000);
    }
  };

  return (
    <div className="file-uploader">
      {!showViewer ? (
        <div className="upload-section">
          <h2>3D Reconstruction Pipeline</h2>
          <p className="description">
            Upload multiple images to generate a 3D model reconstruction
          </p>
          
          <div className="upload-box glass-card">
            <label htmlFor="file-input" className="file-label">
              <div className="file-label-content">
                {isFilesPicked ? (
                  <>
                    <span className="file-count">{selectedFiles.length} files selected</span>
                  </>
                ) : (
                  <>
                    <span>Drag & drop files or click to browse</span>
                  </>
                )}
              </div>
            </label>
            
            <input
              id="file-input"
              type="file"
              onChange={handleFileChange}
              className="file-input"
              multiple
              accept="image/*,.zip"
            />
            
            {loading && (
              <div className="progress-container">
                <div 
                  className="progress-bar" 
                  style={{ width: `${progress}%` }}
                ></div>
                <span className="progress-text">{progress}%</span>
              </div>
            )}
            
            <button 
              className="upload-button" 
              onClick={handleUpload} 
              disabled={loading || !isFilesPicked}
            >
              {loading ? 'Processing...' : 'Start Reconstruction'}
            </button>
            
            {error && <div className="error-message">{error}</div>}
          </div>
          
          <div className="file-requirements glass-card">
            <h4>Requirements:</h4>
            <ul>
              <li>Minimum 10 images of the same object</li>
              <li>Clear, well-lit photos from different angles</li>
              <li>Supported formats: JPG or PNG </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="results-section">
          <div className="results-header">
            <h2>3D Reconstruction Results</h2>
            <button 
              className="back-button" 
              onClick={() => setShowViewer(false)}
            >
              ← Process New Images
            </button>
          </div>
          
          <div className="results-grid">
            {results.map((result, index) => (
              <div key={index} className="result-card glass-card">
                <h3>Model #{index + 1}</h3>
                <div className="model-viewer-container">
                  <ThreeDViewer modelUrl={`http://localhost:5000/output/${result}`} />
                </div>
                <div className="result-actions">
                  <button 
                    className="download-button" 
                    onClick={() => handleDownload(result)}
                  >
                    Download GLB
                  </button>
                  {/* <button className="share-button">Share</button> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploader;


// import React, { useState } from 'react';
// import './styles/fileUploader.css';
// import ThreeDViewer from './ThreeDViewer';
// import './styles/threeD.css';

// const FileUploader = () => {
//   const [selectedFiles, setSelectedFiles] = useState([]);
//   const [isFilesPicked, setIsFilesPicked] = useState(false);
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [showViewer, setShowViewer] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const [error, setError] = useState(null);

//   const handleFileChange = (event) => {
//     const files = Array.from(event.target.files);
//     if (files.length > 0) {
//       setSelectedFiles(files);
//       setIsFilesPicked(true);
//       setError(null);
//     }
//   };

//   const handleUpload = async () => {
//     if (selectedFiles.length === 0) {
//       setError('Please select files first.');
//       return;
//     }

//     setLoading(true);
//     setProgress(0);
//     const formData = new FormData();

//     selectedFiles.forEach((file) => {
//       formData.append("files", file);
//     });

//     try {
//       // Upload files
//       setProgress(20);
//       const uploadResponse = await fetch('http://localhost:5000/upload', {
//         method: 'POST',
//         body: formData,
//       });

//       if (!uploadResponse.ok) {
//         throw new Error(`Upload failed: ${uploadResponse.statusText}`);
//       }

//       const uploadResult = await uploadResponse.json();
//       console.log('Upload success:', uploadResult);
//       setProgress(40);

//       // Run pipeline
//       const pipelineResponse = await fetch('http://localhost:5000/run_pipeline', {
//         method: 'POST',
//       });

//       if (!pipelineResponse.ok) {
//         throw new Error(`Pipeline failed: ${pipelineResponse.statusText}`);
//       }

//       const pipelineResult = await pipelineResponse.json();
//       console.log('Pipeline result:', pipelineResult);
//       setProgress(70);

//       // Get results
//       const resultsResponse = await fetch('http://localhost:5000/results');
//       if (!resultsResponse.ok) {
//         throw new Error(`Failed to fetch results: ${resultsResponse.statusText}`);
//       }

//       const resultsData = await resultsResponse.json();
//       setResults(resultsData.results);
//       setProgress(90);

//       if (resultsData.results.length > 0) {
//         setShowViewer(true);
//       }

//       setProgress(100);
//     } catch (error) {
//       console.error('Error:', error);
//       setError(error.message);
//     } finally {
//       setLoading(false);
//       setTimeout(() => setProgress(0), 2000);
//     }
//   };

//   return (
//     <div className="file-uploader">
//       {!showViewer ? (
//         <div className="upload-section">
//           <h2>3D Reconstruction Pipeline</h2>
//           <p className="description">
//             Upload multiple images to generate a 3D model reconstruction
//           </p>
          
//           <div className="upload-box glass-card">
//             <label htmlFor="file-input" className="file-label">
//               <div className="file-label-content">
//                 {isFilesPicked ? (
//                   <>
//                     <span className="file-count">{selectedFiles.length} files selected</span>
//                     <span className="file-names">
//                       {selectedFiles.slice(0, 3).map(file => file.name).join(', ')}
//                       {selectedFiles.length > 3 && ` +${selectedFiles.length - 3} more`}
//                     </span>
//                   </>
//                 ) : (
//                   <>
//                     <i className="upload-icon">📁</i>
//                     <span>Drag & drop files or click to browse</span>
//                   </>
//                 )}
//               </div>
//             </label>
            
//             <input
//               id="file-input"
//               type="file"
//               onChange={handleFileChange}
//               className="file-input"
//               multiple
//               accept="image/*,.zip"
//             />
            
//             {loading && (
//               <div className="progress-container">
//                 <div 
//                   className="progress-bar" 
//                   style={{ width: `${progress}%` }}
//                 ></div>
//                 <span className="progress-text">{progress}%</span>
//               </div>
//             )}
            
//             <button 
//               className="upload-button" 
//               onClick={handleUpload} 
//               disabled={loading || !isFilesPicked}
//             >
//               {loading ? 'Processing...' : 'Start Reconstruction'}
//             </button>
            
//             {error && <div className="error-message">{error}</div>}
//           </div>
          
//           <div className="file-requirements glass-card">
//             <h4>Requirements:</h4>
//             <ul>
//               <li>Minimum 5 images of the same object</li>
//               <li>Clear, well-lit photos from different angles</li>
//               <li>Supported formats: JPG, PNG, ZIP (max 50MB)</li>
//             </ul>
//           </div>
//         </div>
//       ) : (
//         <div className="results-section">
//           <div className="results-header">
//             <h2>3D Reconstruction Results</h2>
//             <button 
//               className="back-button" 
//               onClick={() => setShowViewer(false)}
//             >
//               ← Process New Images
//             </button>
//           </div>
          
//           <div className="results-grid">
//             {results.map((result, index) => (
//               <div key={index} className="result-card glass-card">
//                 <h3>Model #{index + 1}</h3>
//                 <div className="model-viewer-container">
//                   <ThreeDViewer modelUrl={`http://localhost:5000/output/${result}`} />
//                 </div>
//                 <div className="result-actions">
//                   <button className="download-button">Download GLB</button>
//                   <button className="share-button">Share</button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FileUploader;