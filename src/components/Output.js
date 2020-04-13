import React, { useState, useEffect } from "react";
import similarity from "compute-cosine-similarity";

// Great npm package for computing cosine similarity

// Cosine similarity as a distance function. The lower the number, the closer // the match
// poseVector1 and poseVector2 are a L2 normalized 34-float vectors (17 keypoints each
// with an x and y. 17 * 2 = 32)

function poseSimilarity(pose1, pose2){
    const poseVector1 = getPoseVector(pose1);
    // console.log(poseVector1)
    const poseVector2 = getPoseVector(pose2);
    // console.log(poseVector2)
    return cosineDistanceMatching(poseVector1, poseVector2);
}

function getPoseVector(pose) {
    if(pose){
        const xPos = pose.keypoints.map(k => k.position.x);
        const yPos = pose.keypoints.map(k => k.position.y);
    
        let minX = Math.min(...xPos);
        // let maxX = Math.max(...keypoint.position.x);
        let minY = Math.min(...yPos);
        // let maxY = Math.max(...keypoint.position.y);
    
        const vector = [];
        for (let i = 0; i < xPos.length; i++) {
        vector.push(xPos[i] - minX);
        vector.push(yPos[i] - minY);
        }
        return vector;
   }
  }

function cosineDistanceMatching(poseVector1, poseVector2) {
    if (poseVector1 && poseVector2) {
      let cosineSimilarity = similarity(poseVector1, poseVector2);
      let distance = 2 * (1 - cosineSimilarity);
      return Math.sqrt(distance);
    }
}


export default function Output({ pose1, pose2 }) {
  const [score, setScore] = useState(0);
  const [color, setColor] = useState("red");
  const [text, setText] = useState("wrong");



  function css() {
    
    if (score > 70) {
        console.log("yaha")
      setText("Good");
      setColor("#4BB543");
    } else if (score  > 50 && score< 70) {
      setText("Okay");
      setColor("#9080bc");
      console.log("teha")

    } 
    else {
        console.log("neha")
      setText("wrong");
      setColor("#FF2C2C");
    }
  }

        //  console.log("pose1", pose1)
        //  console.log("pose2", pose2)
        useEffect(()=>{
            let scores = poseSimilarity(pose1,pose2)
            let roundedscore = Math.round(scores*100)/100
            setScore(roundedscore*100)
            css()
        },[pose1,pose2])

        //   useEffect(()=>{
//      let tempscore = poseSimilarity(pose1, pose2)
//     //  console.log(tempscore)
//      setScore(tempscore)
//   },[pose1,pose2])

    return (
    <div>
      <h2 style={{ 'color': color}}>
       {text} {score}%
      </h2>
    </div>
  );

}

  
  

//   useEffect(() => {
//     css();
//   }, [props.output]);

//   return (
//     <div>
//       <h2 style={{ color: color }}>
//         {text} {props.output}%
//       </h2>
//     </div>
//   );
