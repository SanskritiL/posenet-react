// import React, { useState, useRef, useEffect } from "react";
// import P5 from "./P5";
// import * as ml5 from "ml5"; //import ml5
// import Output from "./Output";

// let brain;
// let poseNet;
// let poseLabel;
// export default function Deploy({ webcamRef }) {
//   const [pose, setPose] = useState(null);
//   const [matchpose, setMatchpose] = useState(null);
//   const [inputArray, setInputArray] = useState(null);
//   const [confidence, setConfidence] = useState(null);

//   const loadPoseNet = () => {
//      //initialize ml5.posenet
//      poseNet = ml5.poseNet(webcamRef.current.video, () => {
//       console.log("model loaded");
//     }); 
//     poseNet.on("pose", gotPoses);

//     let options = {
//       inputs: 34,
//       outputs: 4,
//       task: "classification",
//       debug: true
//     };

//     brain = ml5.neuralNetwork(options);

//     const modelInfo = {
//       model: "data/model/model2.json",
//       metadata: "data/model/model_meta2.json",
//       weights: "data/model/model.weights2.bin"
//     };

//     brain.load(modelInfo, brainLoaded);
//     // brain.loadData('data/ymca.json',dataReady)
//   };

//   const gotPoses = poses => {
//     if (poses.length > 0) {
//       setPose(poses[0].pose);
//       setMatchpose(poses[0]);
//     }
//   };

//   function brainLoaded() {
//     console.log("pose classification ready");
//     classifyPose();
//   }

//   function classifyPose() {
//     if (pose) {
//       let tempInputArray = pose.keypoints
//         .map(item => {
//           return [item.position.x, item.position.y];
//         })
//         .flat();
//       setInputArray(tempInputArray);
//       brain.classify(inputArray, gotResults);
//     }
//   }

//   function gotResults(error, results) {
//     if (results) {
//       poseLabel = results[0].label;
//       setConfidence(results[0].confidence * 100);
//       // confidence = results[0].confidence;
//       // console.log('The pose is: ',poseLabel ,'and the confidence is'  ,confidence);
//     }
//   }

//   useEffect(() => {
//     if (pose) {
//       classifyPose();
//     }
//   }, [pose]);

//   return (
//     <div>
//       <button onClick={loadPoseNet}>Start</button>
//       {/* <P5 pose={matchpose} finalres={poseLabel}/> */}
//       <Output output = {confidence}/>
//     </div>
//   );
// }
