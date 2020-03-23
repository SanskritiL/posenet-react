import React, { useEffect, useRef, useState } from "react";
import * as ml5 from "ml5"; //import ml5
import P5 from "./P5";
import DATA_JSON from './ymca.json'

//collect the poses as required
let brain;
let poseNet;

export default function PoseNet({ webcamRef }) {

 
  let array;

  const [poses, setPoses] = useState(null);
  const [dataState, setDataState] = useState("waiting");
  const [inputArray, setInputArray] = useState([]);
  const [targetLabel, setTargetLabel] = useState(null)



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
    
  };

  const gotPoses = poses => {
    if (poses.length > 0) {
      setPoses(poses[0]);
    }
  }

  //sets the data collection state
  function collectDataMode(key) {
    setTargetLabel(key)
    console.log(targetLabel , " button pressed. you've got 5 secs");
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
    
    if (dataState === "collecting") {
      let target = [targetLabel]
      brain.addData(inputArray, target)
    };
  }, [inputArray]);
 
  const saveTrainingData = () => {
    brain.saveData()
  }
  const loadData = () => {
    brain.loadData(DATA_JSON, dataReady)
  }
 const dataReady = () => {
  console.log("ok data ready")
   brain.normalizeData()
   brain.train({epochs: 10}, finished);
 }
 const finished = () => {
   console.log("model trained")
   brain.save()
 }



  return (
    <div>
      <h1>{ml5.version}</h1>
      <h2>{dataState}</h2>
      <button onClick={ () => collectDataMode("Y")}> Collect Data Y</button>
      <button onClick={() => collectDataMode("C")}> Collect Data C</button>
      <button onClick={() => collectDataMode("M")}> Collect Data M</button>
      <button onClick={() => collectDataMode("A")}> Collect Data A</button>
     <hr></hr>


      <button onClick={loadData}> Load Data </button>
      <button onClick={saveTrainingData}> save Data </button>
      <P5 poses={poses} />
    </div>
  );
}



