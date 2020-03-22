import React,{useState} from "react"
export default function sketch(p) {
    let rotation = 0;
    let poses;
    let video;
    
    
    //console.log("here")
    p.setup = function () {
      p.createCanvas(1080, 840);
      video = p.createCapture(p.VIDEO);
      video.size(1080,840);
      video.hide();
    };
    
    p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
    
      if (props.poses !== null) {
        poses = props.poses
        //console.log("pose : ",poses)
      }
    };
  
    p.draw = function () {
       p.background(255,0,0)
       p.translate(video.width, 0)
       p.scale(-1,1)
       p.image(video, 0, 0,1080,840);
        if (poses) {
          poses.pose.keypoints.map(item => {
            let x = item.position.x;
            let y = item.position.y;
            p.fill(255, 192, 203);
            p.ellipse(x, y, 20);
          });

         for(let i= 0; i<poses.skeleton.length; i++){
            let a = poses.skeleton[i][0];
            let b = poses.skeleton[i][1];
            p.strokeWeight(3)
            p.stroke(255, 20, 147)
            p.line(a.position.x, a.position.y, b.position.x, b.position.y)
         }
         
        }
      
    };
  

  };