import React ,{useEffect,useRef,useState}from "react"
import * as ml5 from 'ml5' //import ml5
import P5 from "./P5"
//collect the poses as required

export default function PoseNet({webcamRef}){

   
   let poseNet
   const [pose, setPose] = useState(false)
  

   const loadPoseNet = () => {
       poseNet = ml5.poseNet(webcamRef.current.video, ()=>{ console.log("model loaded")}) //initialize ml5.posenet      
       poseNet.on('pose', (poses)=> {
        if(poses.length > 0){
            setPose(poses[0].pose)
           }
    })
    }
  
   
       useEffect(()=>{
        if(webcamRef) {
            webcamRef.current.video.style.display = "none";
          }
        loadPoseNet(); 
       },[])
    
       useEffect(()=>{
           console.log(pose.keypoints)
       },[pose])
   

    // useEffect(()=>{
    //      getPose()
    // },[pose])
 
    

    return(
        <div>
            <h1>{ml5.version}</h1>
            <P5 pose={pose}/>
        </div>
    
    )
}