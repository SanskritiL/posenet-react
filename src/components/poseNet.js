import React, { useEffect, useRef, useState } from "react";
import * as ml5 from "ml5"; //import ml5
import P5 from "./P5";
import KeyPress from "./KeyPress";
import Output from "./Output";


//collect the poses as required
let brain;
let poseNet;

export default function PoseNet({ webcamRef }) {
  const [poses, setPoses] = useState(null);
  
  // const [dataState, setDataState] = useState("waiting");
  // const [inputArray, setInputArray] = useState([]);
  const [targetArray, setTargetArray] = useState(null);

 const [posevector1, setPoseVector1] = useState()
 const [posevector2, setPoseVector2] = useState()

  const [image, setImage] = useState([])
  const[counter, setCounter] = useState(0)

  let array_of_images = [
      'bigtoepose', 'chairpose','dance','eagle','garland',
      'gate','half-moon','tadasana','warrior-I','vrksasana',
      'parivrtta-trikonasana'
  ]  
  let x = 0;
 

  function setTimer(){
    //console.log("timer")
    let randomNumber = Math.floor(Math.random() * 9);
    setTimeout(()=>{
          setImage(array_of_images[randomNumber])
          //console.log(image)
          // getArray()
          // console.log(inputArray)
          setCounter(prev=>prev+1)
      }, 5000)
  }

  function getArray() {
    if (poses) {
      let tempInputArray = poses.pose.keypoints
        .map(item => {
          return [Math.round(item.position.x * 100)/100, Math.round(item.position.y * 100)/100];
        })
        .flat();
      setPoseVector2(tempInputArray);
      
    }
  }



  useEffect(() => {
      setTimer()
     fetch('data/moves.json')
    .then(res => res.json())
    .then((data)=> {
        let tempArr = Object.keys(data);
        tempArr.map((pose_item) => {
          if(pose_item === image){
            setTargetArray(data[pose_item])
          }
        } )
        if(targetArray){
          let temp = targetArray.keypoints.map(item => {
            return [item.position.x,item.position.y];
          }).flat();
          setPoseVector1(temp);
          // console.log("The actual pose: " , posevector1)
        }
    })

  }, [counter])



  const loadPoseNet = () => {
    poseNet = ml5.poseNet(webcamRef.current.video, () => {
      // console.log("model loaded");
    }); //initialize ml5.posenet

    poseNet.on("pose", gotPoses);

    let options = {
      inputs: 34,
      outputs: 4,
      task: "classification",
      debug: false
    };
    brain = ml5.neuralNetwork(options);
  };

  const gotPoses = poses => {
    if (poses.length > 0) {
      setPoses(poses[0]);
    //  console.log("users pose: " ,inputArray)
    }
  };


  useEffect(()=>{
    getArray()
    // console.log(posevector2)
  },[poses])

//  //There's a better way to do this!!
//   function collectDataMode(key) {
//     setTargetLabel(key);
//     console.log(targetLabel, " button pressed. you've got 5 secs");
//     setTimeout(() => {
//       setDataState("collecting");
//       setTimeout(() => {
//         setDataState("collected");
//       }, 10000);
//     }, 10000);
//   }
  

  


  useEffect(() => {
    if (webcamRef) {
      webcamRef.current.video.style.display = "none";
    }
    loadPoseNet();
    
    

  }, []);

//   useEffect(() => {
//     if (dataState === "collecting") {
//       console.log("updated poses if collecting");
//       let tempInputArray = poses.pose.keypoints
//         .map(item => {
//           return [item.position.x, item.position.y];
//         })
//         .flat();
//       setInputArray(tempInputArray);
//     }
//   }, [poses]);

//   useEffect(() => {
//     if (dataState === "collecting") {
//       brain.addData(inputArray, [targetLabel]);
//     }
//   }, [inputArray]);

//   const saveTrainingData = () => {
//     console.log("normalziign");
//     brain.normalizeData();
//     brain.saveData();
//   };

//   const dataReady = () => {
//     console.log("ok data ready");
//     brain.train({ epochs: 10 }, finished);
//   };
//   const finished = () => {
//     console.log("model trained");
//     brain.save();
//   };

  return (
    <div>
      {/* <button onClick={() => collectDataMode("Downward Dog")}> Collect Data - Downward Dog</button>
      <button onClick={() => collectDataMode("Balasana")}> Collect Data-Balasana </button>
      <button onClick={() => collectDataMode("Sukhasana")}> Collect-Sukhasana </button>
      <button onClick={() => collectDataMode("Warrior 2")}> Collect Data Warrior 2 </button>
      <hr></hr> */}

      {/* <button onClick={saveTrainingData}> save Data </button> */}
      {/* <KeyPress /> */}
      {/* <Deploy webcamRef={webcamRef} /> */}
      <div>
        <img
        style={{
            float: "left",
            width: "580px",
            height: "440px",
            marginLeft: "12px",
            marginTop: "80px",
            border: "9px solid #ACDF87",
            borderRadius: "10%",
        }}
        src = {`pose/${image}.png`}
        
        />
        <h3>Given pose: {image}</h3>
      </div>
      <P5 poses={poses} /> 
      <Output  poseVector1={posevector1} poseVector2={posevector2}/>
    </div>
  );
}
