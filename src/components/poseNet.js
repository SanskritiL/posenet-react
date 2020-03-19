import React ,{useEffect,useRef,useState}from "react"
import * as ml5 from 'ml5' //import ml5
import Sketch from "react-p5"
//collect the poses as required

export default function PoseNet({webcamRef}){


   let poseNet
   let video
   let x
   let y

   const loadPoseNet = () => {
       poseNet = ml5.poseNet(webcamRef.current.video, modelLoaded) //initialize ml5.posenet
   }


   function modelLoaded() {
       console.log("model loaded")
   }
   function gotPoses(poses){
       if(poses.length > 0){
         console.log(poses[0].pose)
          
          
         
       }
   }
   
   const setup = (p5, webcamRef) => {
    p5.createCanvas(680, 540).parent(webcamRef); // use parent to render canvas in this ref (without that p5 render this canvas outside your component)
    video = p5.createCapture(p5.VIDEO)
    video.hide();  

};

 const draw = p5 => {
       
       p5.image(video, 0, 0)
       p5.fill(255,0,0)
       p5.ellipse(20, 20, 70, 70);
   }

    useEffect(()=>{
         if(webcamRef){
             webcamRef.current.video.style.display = "none";
         }
         loadPoseNet()
         poseNet.on('pose', gotPoses)
         

    },[])

 
    

    return(
        <div>
            <h1>{ml5.version}</h1>
            <Sketch setup={setup} draw={draw}/>
        </div>
    
    )
}