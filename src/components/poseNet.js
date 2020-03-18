import React ,{useEffect,useRef,useState}from "react"
import * as ml5 from 'ml5' //import ml5

//collect the poses as required

export default function PoseNet({webcamRef}){

const [pose, setPose] = useState(null);


   let poseNet
   

  const classifyImg =() =>{
      poseNet = ml5.poseNet(webcamRef.current.video, () => {
          console.log("posetnet model loaded")
      })
      poseNet.on("pose", gotPoses);
      let options={
        inputs: 34, // The total Array length of every keypoinst. ( nose, eyes, ear...etc)
        outputs: 4, // The number of label that we assigned ( in my case, I only have either "Do Squats" or "Not" )
        task: "classification", // This type will give you the discrete reslut that we labeled
        debug: true // Give you a UI while training the data.
      }
  }
  const gotPoses = poses => {
    if (poses.length > 0) {
      setPose(poses[0].pose);
      console.log(poses[0].pose)
    }
  };

    useEffect(()=>{
       
        if(webcamRef){
            console.log("yaha aairaxa")
            //webcamRef.current.video.style.display = "none";

         }
         classifyImg()

    },[])
    return(
    <h1>{ml5.version}</h1>
    )
}