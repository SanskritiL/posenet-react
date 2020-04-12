import React, { useState } from "react";

export default function sketch(p) {
  let rotation = 0;
  let poses;
  let video;
  let brain;
  let poseLabel;

  //console.log("here")
  p.setup = function() {
    // p.createCanvas(580, 440);
    let x = p.createCanvas(580,440);
    x.elt.style.border='9px solid #ACDF87';
    x.elt.style.borderRadius='10%';
    x.elt.style.float='right';
    x.elt.style.marginRight='15px';
    video = p.createCapture(p.VIDEO);
    video.size(580, 440);
    video.hide();
  };

  p.myCustomRedrawAccordingToNewPropsHandler = function(props) {
    if (props.poses !== null) {
      poses = props.poses;
      // console.log("pose : ",poses)
    }
  };

  p.draw = function() {
    //p.background(255, 0, 0);

    p.translate(video.width, 0);
    p.scale(-1, 1);
    p.image(video, 0, 0, 580, 440);
    if (poses) {
      poses.pose.keypoints.map(item => {
        let x = item.position.x;
        let y = item.position.y;
        p.fill(255, 192, 203);
        p.ellipse(x, y, 17);
      });

      for (let i = 0; i < poses.skeleton.length; i++) {
        let a = poses.skeleton[i][0];
        let b = poses.skeleton[i][1];
        // p.fill(230)
        p.strokeWeight(3);
        p.stroke(255, 20, 147);
        p.line(a.position.x, a.position.y, b.position.x, b.position.y);
      }

      //  p.fill(255,0,255)
      //  p.noStroke()
      //  p.textSize(256)
      //  p.textAlign(p.CENTER, p.CENTER);
      //  p.text(poseLabel, video.width/2, video.height/2)
    }
  };
}
