import React, { useEffect, useRef, useState } from "react";
import * as ml5 from "ml5"; //import ml5
import P5 from "./P5";

//collect the poses as required
let brain;
let poseNet;
let x=1;

export default function PoseNet({ webcamRef }) {

 
  let array;

  const [poses, setPoses] = useState(null);
  const [dataState, setDataState] = useState("waiting");
  const [inputArray, setInputArray] = useState([]);

  const loadPoseNet = () => {
    
    poseNet = ml5.poseNet(webcamRef.current.video, () => {
      console.log("model loaded");
    }); //initialize ml5.posenet

    poseNet.on("pose", gotPoses);

    let options = {
      inputs: 34,
      outputs: 4,
      task: "classification",
      debug: true
    };
    brain = ml5.neuralNetwork(options);
    x = 5;
  };

  const gotPoses = poses => {
    if (poses.length > 0) {
      setPoses(poses[0]);
    }
  }

  //sets the data collection state
  function collectDataMode() {
    console.log("button pressed. you've got 10 secs");
     setTimeout(() => {
       setDataState("collecting");
       setTimeout(() => {
         setDataState("collected");
       }, 10000);
     }, 5000);
   }


  useEffect(() => {
    if (webcamRef) {
      webcamRef.current.video.style.display = "none";
    }
    loadPoseNet();
  }, []);



  useEffect(() => {
    if (dataState === "collecting") {
      console.log("updated poses if collecting");
      let tempInputArray = poses.pose.keypoints
        .map(item => {
          return [item.position.x, item.position.y];
        })
        .flat();
     setInputArray(tempInputArray)
    }
  }, [poses]);

  useEffect(() => {
    console.log(x)
    if (dataState === "collecting") {
      brain.addData(inputArray, ["Y"])
    };
  }, [inputArray]);
 
  const saveTrainingData = () => {
    brain.saveData()
  }

  return (
    <div>
      <h1>{ml5.version}</h1>
      <h2>{dataState}</h2>
      <button onClick={collectDataMode}> Collect Data </button>
      <button onClick={saveTrainingData}> save Data </button>
      <P5 poses={poses} />
    </div>
  );
}
