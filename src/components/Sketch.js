import React,{useState} from "react"
export default function sketch(p) {
    let rotation = 0;
    let pose;
    let video;

    
    console.log("hello")
    p.setup = function () {
      p.createCanvas(1080, 840);
      video = p.createCapture(p.VIDEO);
      video.size(1080,840);
      video.hide();
    };
    
    p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
    
      if (props.pose !== null) {
        pose = props.pose
        console.log("pose : ",pose)
      }
    };
  
    p.draw = function () {
       p.background(255,0,0)
       p.image(video, 0, 0,1080,840);
        if (pose) {
          pose.keypoints.map(item => {
            let x = item.position.x;
            let y = item.position.y;
            p.fill(16, 153, 227);
            p.ellipse(x, y, 30);
          });


      

        }
      
    };
  

  };