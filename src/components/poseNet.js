import React, { useEffect, useRef, useState } from "react";
import * as ml5 from "ml5"; //import ml5
import P5 from "./P5";
import Output from "./Output";

let poseNet;
export default function PoseNet({ webcamRef }) {
  const [poses, setPoses] = useState(null);
  const [pose, setPose] = useState(null);
  const [targetArray, setTargetArray] = useState(null);
  const [image, setImage] = useState([]);
  const [counter, setCounter] = useState(0);

  const options = {
    flipHorizontal: false,
   
  }

  let array_of_images = [
    "bigtoepose",
    "chairpose",
    "dance",
    "eagle",
    "garland",
    "gate",
    "half-moon",
    "tadasana",
    "warrior-I",
    "vrksasana",
    "warrior2",
    "parivrtta-trikonasana",
  ];

  function setTimer() {
    let randomNumber = Math.floor(Math.random() * 9);
    setTimeout(() => {
      // setImage(array_of_images[randomNumber]);
            setImage(array_of_images[4]);

      setCounter((prev) => prev + 1);
    }, 5000);
  }

  useEffect(() => {
    setTimer();
    fetch("data/moves.json")
      .then((res) => res.json())
      .then((data) => {
        let tempArr = Object.keys(data);
        tempArr.map((pose_item) => {
          if (pose_item === image) {
            setTargetArray(data[pose_item]);
          }
        });
      });
  }, [counter]);

  const loadPoseNet = () => {
    poseNet = ml5.poseNet(webcamRef.current.video, options, () => {console.log("posenet loaded")}); //initialize ml5.posenet
    poseNet.on("pose", gotPoses);
  };

  const gotPoses = (poses) => {
    if (poses.length > 0) {
      setPoses(poses[0]);
      setPose(poses[0].pose);
    }
  };

  useEffect(() => {
    if (webcamRef) {
      webcamRef.current.video.style.display = "none";
    }
    loadPoseNet();
  }, []);

    useEffect(() => {
     setPose(pose)
    //  console.log("our pose: ",pose)
    //  console.log("target pose: ",targetArray)

    }, [pose]);

  return (
    <div>
      <div>
        <img
          style={{
            float: "left",
            width: "580px",
            height: "540px",
            marginLeft: "12px",
            marginTop: "80px",
            border: "9px solid #ACDF87",
            borderRadius: "10%",
          }}
          src={`pose/${image}.png`}
        />
        <h3>Given pose: {image}</h3>
      </div>
      <P5 poses={poses} />
      <Output pose1={targetArray} pose2={pose} />
    </div>
  );
}
