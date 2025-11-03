// import React, { useEffect, useRef } from "react";
// import * as faceapi from "face-api.js";
// import "./facial.css";
// import axios from 'axios'

// export default function FacialExpression({setSongs}) {
//   const videoRef = useRef();
//   const canvasRef = useRef();
//   const loadModels = async () => {
    
//     const MODEL_URL = "/models";

//     await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
//     await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
//   };
//   const startVideo = () => {
//     navigator.mediaDevices
//       .getUserMedia({ video: true })
//       .then((stream) => {
//         videoRef.current.srcObject = stream;
//       })
//       .catch((err) => console.error("Error accessing webcam: ", err));
//   };
//   const detectFaces = async () => {
//     const detections = await faceapi
//         .detectAllFaces(
//           videoRef.current,
//           new faceapi.TinyFaceDetectorOptions()
//         )
//         .withFaceExpressions();
      
      
      

//       if(!detections || detections.length === 0) {
//         console.log("No face detected");
//         return; 
//       }
//       let mostProbableExpression = 0;
//       let expressionName = "";

//       for(const expression of Object.keys(detections[0].expressions)) {
//         if(detections[0].expressions[expression] > mostProbableExpression) {
//           mostProbableExpression = detections[0].expressions[expression];
//           expressionName = expression;
//         }
//       }
//       axios.get(`http://localhost:3000/songs?mood=${expressionName}`)
//       .then(res =>{
//         console.log(res.data)
//         setSongs(res.data.songs)
//       })
//   }


//   useEffect(() => {
    
    
//     loadModels().then(startVideo);
    
//   }, []);
//   return (
//     <div className="mood-element bg-gray-800">
//       <video
//         ref={videoRef}
//         autoPlay
//         muted
//         className="user-video-feed"
        
//       />
//       <button onClick={detectFaces}
//       > Detect</button>
//     </div>
//   );
// }


import React, { useEffect, useRef } from "react";
import * as faceapi from "face-api.js";
import axios from "axios";

export default function FacialExpression({ setSongs }) {
  const videoRef = useRef();

  const loadModels = async () => {
    const MODEL_URL = "/models";
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
    await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
  };

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => console.error("Error accessing webcam: ", err));
  };

  const detectFaces = async () => {
    const detections = await faceapi
      .detectAllFaces(
        videoRef.current,
        new faceapi.TinyFaceDetectorOptions()
      )
      .withFaceExpressions();

    if (!detections || detections.length === 0) {
      console.log("No face detected");
      return;
    }

    let mostProbableExpression = 0;
    let expressionName = "";

    for (const expression of Object.keys(detections[0].expressions)) {
      if (detections[0].expressions[expression] > mostProbableExpression) {
        mostProbableExpression = detections[0].expressions[expression];
        expressionName = expression;
      }
    }

    axios
      .get(`http://localhost:3000/songs?mood=${expressionName}`)
      .then((res) => {
        setSongs(res.data.songs);
      });
  };

  useEffect(() => {
    loadModels().then(startVideo);
  }, []);

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Webcam Container */}
      <div className="w-full max-w-md rounded-2xl overflow-hidden border-4 border-purple-500 shadow-lg">
        <video
          ref={videoRef}
          autoPlay
          muted
          className="w-full h-72 object-cover"
        />
      </div>

      {/* Detect Button */}
      <button
        onClick={detectFaces}
        className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-lg font-bold shadow-md hover:shadow-xl hover:scale-105 transition transform duration-300"
      >
        🎯 Detect Mood
      </button>
    </div>
  );
}
