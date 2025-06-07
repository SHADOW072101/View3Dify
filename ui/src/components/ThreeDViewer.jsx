// // import React, { Suspense } from 'react';
// // // import { useNavigate } from "react-router-dom";
// // import { Canvas } from '@react-three/fiber';
// // import { OrbitControls, useGLTF } from '@react-three/drei';
// // import './styles/threeD.css'; // Import the CSS file

// // function Model({ url }) {
// //   const { scene } = useGLTF(url);
// //   return <primitive object={scene} scale={1} position={[0, 0, 0]} />;
// // }

// // function ThreeDViewer({ modelUrl }) {
// //   console.log('Loading 3D model from:', modelUrl); // Log the model URL
// //   return (
// //     <div className='three-d-viewer'>
// //       <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
// //         <Suspense fallback={null}>
// //           <Model url={modelUrl} />
// //           <OrbitControls />
// //           <ambientLight intensity={0.1} />
// //           <pointLight position={[10, 10, 10]} intensity={0.5} />
// //         </Suspense>
// //       </Canvas>
// //     </div>
// //   );
// // }

// // export default ThreeDViewer;



// import React, { Suspense } from 'react';
// import { Canvas } from '@react-three/fiber';
// import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
// import './styles/threeD.css';

// function Model({ url }) {
//   const { scene } = useGLTF(url);
//   return <primitive object={scene} scale={1} position={[0, 0, 0]} />;
// }

// function ThreeDViewer({ modelUrl }) {
//   console.log('Loading 3D model from:', modelUrl);
  
//   return (
//     <div className='three-d-viewer'>
//       <Canvas 
//         camera={{ position: [5, 5, 5], fov: 50 }}
//         shadows // Enable shadows in the scene
//       >
//         <Suspense fallback={null}>
//           {/* Main lighting */}
//           <directionalLight
//             position={[10, 10, 5]}
//             intensity={1}
//             castShadow
//             shadow-mapSize-width={1024}
//             shadow-mapSize-height={1024}
//           />
          
//           {/* Fill light */}
//           <hemisphereLight 
//             intensity={0.3} 
//             groundColor="black" 
//           />
          
//           {/* Backlight */}
//           <pointLight 
//             position={[-10, -10, -5]} 
//             intensity={0.5} 
//             color="blue" 
//           />
          
//           {/* Ambient light for overall illumination */}
//           <ambientLight intensity={0.2} />
          
//           {/* Environment lighting for reflections */}
//           <Environment preset="city" />
          
//           <Model url={modelUrl} />
//           <OrbitControls 
//             enablePan={true}
//             enableZoom={true}
//             enableRotate={true}
//           />
//         </Suspense>
//       </Canvas>
//     </div>
//   );
// }

// export default ThreeDViewer;

// import React, { Suspense, useState, useEffect } from 'react';
// import { Canvas } from '@react-three/fiber';
// import { OrbitControls, Environment, useProgress, Html } from '@react-three/drei';
// import { useLoader } from '@react-three/fiber';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
// import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
// import * as THREE from 'three';
// import './styles/threeD.css';

// function Loader() {
//   const { progress } = useProgress();
//   return (
//     <Html center>
//       <div className="loader">{progress} % loaded</div>
//     </Html>
//   );
// }

// function Model({ url, fileType }) {
//   // We'll use a single useLoader hook and switch the loader based on fileType
//   let loader;
//   switch (fileType.toLowerCase()) {
//     case 'gltf':
//     case 'glb':
//       loader = GLTFLoader;
//       break;
//     case 'fbx':
//       loader = FBXLoader;
//       break;
//     case 'obj':
//       loader = OBJLoader;
//       break;
//     case 'stl':
//       loader = STLLoader;
//       break;
//     default:
//       throw new Error(`Unsupported file type: ${fileType}`);
//   }

//   const model = useLoader(loader, url);

//   // Process the loaded model based on type
//   let scene;
//   if (fileType === 'gltf' || fileType === 'glb') {
//     scene = model.scene;
//   } else if (fileType === 'stl') {
//     // Convert STL to mesh with material
//     scene = new THREE.Mesh(
//       model,
//       new THREE.MeshStandardMaterial({ color: 0xcccccc, metalness: 0, roughness: 0.8 })
//     );
//   } else {
//     scene = model;
//   }

//   return <primitive object={scene} scale={1} position={[0, 0, 0]} />;
// }

// function ThreeDViewer({ modelUrl }) {
//   const [fileType, setFileType] = useState('');

//   useEffect(() => {
//     if (modelUrl) {
//       const extension = modelUrl.split('.').pop().toLowerCase();
//       setFileType(extension);
//     }
//   }, [modelUrl]);

//   if (!modelUrl || !fileType) return <div className='three-d-viewer'>No model URL provided</div>;

//   console.log('Loading 3D model from:', modelUrl, 'Type:', fileType);
  
//   return (
//     <div className='three-d-viewer'>
//       <Canvas 
//         camera={{ position: [5, 5, 5], fov: 50 }}
//         shadows
//       >
//         <Suspense fallback={<Loader />}>
//           {/* Lighting setup */}

//           <directionalLight
//             position={[10, 10, 5]}
//             intensity={1}
//             castShadow
//             shadow-mapSize-width={1024}
//             shadow-mapSize-height={1024}
//           />
          
//           {/* Fill light */}
//           <hemisphereLight 
//             intensity={0.3} 
//             groundColor="black" 
//           />
          
//           {/* Backlight */}
//           <pointLight 
//             position={[-10, -10, -5]} 
//             intensity={0.5} 
//             color="blue" 
//           />
          
//           {/* Ambient light for overall illumination */}
//           <ambientLight intensity={0.2} />
          
//           {/* Environment lighting for reflections */}
//           <Environment preset="city" />

//           <directionalLight
//             position={[10, 10, 5]}
//             intensity={1}
//             castShadow
//             shadow-mapSize-width={1024}
//             shadow-mapSize-height={1024}
//           />
//           <hemisphereLight intensity={0.3} groundColor="black" />
//           <pointLight position={[-10, -10, -5]} intensity={0.5} color="blue" />
//           <ambientLight intensity={0.2} />
//           <Environment preset="city" />
          
//           <Model url={modelUrl} fileType={fileType} />
          
//           <OrbitControls 
//             enablePan={true}
//             enableZoom={true}
//             enableRotate={true}
//           />
//         </Suspense>
//       </Canvas>
//     </div>
//   );
// }

// export default ThreeDViewer;

import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, useProgress, Html } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';
import * as THREE from 'three';
import './styles/threeD.css';

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="loader">{progress} % loaded</div>
    </Html>
  );
}

async function convertToGLTF(model, format) {
  return new Promise((resolve) => {
    if (format === 'gltf' || format === 'glb') {
      resolve(model);
      return;
    }

    const exporter = new GLTFExporter();
    exporter.parse(
      model,
      (gltf) => {
        // Create a temporary GLTF loader
        const loader = new GLTFLoader();
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
        loader.setDRACOLoader(dracoLoader);

        // Create a blob URL for the GLTF
        const blob = new Blob([JSON.stringify(gltf)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        loader.load(url, (gltfData) => {
          resolve(gltfData);
          URL.revokeObjectURL(url);
        });
      },
      { binary: false }
    );
  });
}

function ModelViewer({ modelUrl, fileType }) {
  const [convertedModel, setConvertedModel] = useState(null);

  useEffect(() => {
    let loader;
    let cleanup = () => {};

    const loadModel = async () => {
      try {
        // Determine loader based on file type
        switch (fileType.toLowerCase()) {
          case 'gltf':
          case 'glb':
            loader = GLTFLoader;
            break;
          case 'fbx':
            loader = FBXLoader;
            break;
          case 'obj':
            loader = OBJLoader;
            break;
          case 'stl':
            loader = STLLoader;
            break;
          case 'dae':
            loader = ColladaLoader;
            break;
          default:
            throw new Error(`Unsupported file type: ${fileType}`);
        }

        // Load the original model
        const originalModel = await new Promise((resolve, reject) => {
          const loaderInstance = new loader();
          loaderInstance.load(
            modelUrl,
            resolve,
            undefined,
            reject
          );
        });

        // For STL files, create a mesh with default material
        let modelToConvert = originalModel;
        if (fileType === 'stl') {
          modelToConvert = new THREE.Mesh(
            originalModel,
            new THREE.MeshStandardMaterial({ color: 0xcccccc, metalness: 0, roughness: 0.8 })
          );
        }

        // Convert to GLTF
        const gltf = await convertToGLTF(modelToConvert, fileType);
        setConvertedModel(gltf);
      } catch (error) {
        console.error('Error loading or converting model:', error);
      }
    };

    loadModel();

    return cleanup;
  }, [modelUrl, fileType]);

  if (!convertedModel) return null;

  return <primitive object={convertedModel.scene || convertedModel} scale={1} position={[0, 0, 0]} />;
}

function ThreeDViewer({ modelUrl, fileType }) {
  const [detectedType, setDetectedType] = useState(fileType || '');

  useEffect(() => {
    if (fileType) {
      setDetectedType(fileType.toLowerCase());
      return;
    }

    if (!modelUrl) return;

    // Handle blob URLs differently
    if (modelUrl.startsWith('blob:')) {
      // For blob URLs, we need to know the type from the original file
      // You should pass the fileType prop when using blob URLs
      console.warn('Blob URL detected but no fileType specified. Assuming GLB format.');
      setDetectedType('glb');
      return;
    }

    // For regular URLs, extract extension
    const url = new URL(modelUrl);
    const pathname = url.pathname;
    const extension = pathname.split('.').pop().toLowerCase();
    setDetectedType(extension);
  }, [modelUrl, fileType]);

  if (!modelUrl) return <div className='three-d-viewer'>No model provided</div>;
  if (!detectedType) return <div className='three-d-viewer'>Detecting file type...</div>;

  return (
    <div className='three-d-viewer'>
      <Canvas 
        camera={{ position: [5, 5, 5], fov: 50 }}
        shadows
      >
        <Suspense fallback={<Loader />}>
          <directionalLight
            position={[10, 10, 5]}
            intensity={1}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <hemisphereLight intensity={0.3} groundColor="black" />
          <pointLight position={[-10, -10, -5]} intensity={0.5} color="blue" />
          <ambientLight intensity={0.2} />
          <Environment preset="city" />
          
          <ModelViewer modelUrl={modelUrl} fileType={detectedType} />
          
          <OrbitControls 
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default ThreeDViewer;