import React, { useState, useRef, useEffect } from "react";
import * as ml5 from "ml5"; //import ml5
let brain;
let poseNet;
let poseLabel;
export default function Deploy({ webcamRef }) {
  const [pose, setPose] = useState(null);
  const [inputArray, setInputArray] = useState(null);

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

    const modelInfo = {
      model: "data/model/model.json",
      metadata: "data/model/model_meta.json",
      weights: "data/model/model.weights.bin"
    };

    brain.load(modelInfo, brainLoaded);
    // brain.loadData('data/ymca.json',dataReady)
  };

  const gotPoses = poses => {
    if (poses.length > 0) {
      setPose(poses[0].pose);
    }
  };

  function brainLoaded() {
    console.log("pose classification ready");
    classifyPose();
  }

  function classifyPose() {
    if (pose) {
      let tempInputArray = pose.keypoints
        .map(item => {
          return [item.position.x, item.position.y];
        })
        .flat();
      setInputArray(tempInputArray);
      brain.classify(inputArray, gotResults);
    }
  }

  function gotResults(error, results) {
    if (results) {
      poseLabel = results[0].label
      console.log(results[0].confidence);
      
    }
  }

  useEffect(() => {
    if (pose) {
      classifyPose();
    }
  }, [pose]);

  return <button onClick={loadPoseNet}>Deploy and Classify</button>;
}
