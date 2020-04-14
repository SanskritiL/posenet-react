import React, { useState, useEffect } from "react";
import similarity from "compute-cosine-similarity";
import normalize from "array-normalize";

// Great npm package for computing cosine similarity

// Cosine similarity as a distance function. The lower the number, the closer // the match
// poseVector1 and poseVector2 are a L2 normalized 34-float vectors (17 keypoints each
// with an x and y. 17 * 2 = 32)

function poseSimilarity(pose1, pose2) {
  const poseVector1 = getPoseVector(pose1);
  const poseVector2 = getPoseVector(pose2);
  return cosineDistanceMatching(poseVector1, poseVector2);
}

function normalize_array(arr) {
  const normalize = function (val, max, min) {
    return (val - min) / (max - min);
  };

  let max = Math.max.apply(null, arr);
  let min = Math.min.apply(null, arr);

  let hold_normed_values = [];
  arr.forEach(function (this_num) {
    hold_normed_values.push(normalize(this_num, max, min));
  });
  //    console.log(hold_normed_values)
  return hold_normed_values;
}

function getPoseVector(pose) {
  if (pose) {
    const xPos = pose.keypoints.map((k) => k.position.x);
    const yPos = pose.keypoints.map((k) => k.position.y);

    let finalvector = [];
    let normalizedX = normalize(xPos);
    let normalizedY = normalize(yPos);

    for (let i = 0; i < xPos.length; i++) {
      finalvector.push(normalizedX[i]);
      finalvector.push(normalizedY[i]);
    }
    console.log(finalvector);
    return finalvector;
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
      setText("Good");
      setColor("#4BB543");
    } else if (score > 50 && score < 70) {
      setText("Okay");
      setColor("#9080bc");
    } else {
      setText("wrong");
      setColor("#FF2C2C");
    }
  }

  //  console.log("pose1", pose1)
  //  console.log("pose2", pose2)
  useEffect(() => {
     console.log("pose1", pose1)
     console.log("pose2", pose2)
    let scores = poseSimilarity(pose1, pose2);
    let roundedscore = Math.round(scores * 100) / 100;
    setScore(roundedscore * 100);
    css();
  }, [pose1, pose2]);

  //   useEffect(()=>{
  //      let tempscore = poseSimilarity(pose1, pose2)
  //     //  console.log(tempscore)
  //      setScore(tempscore)
  //   },[pose1,pose2])

  return (
    <div>
      <h2 style={{ color: color }}>
        {text} {score}%
      </h2>
    </div>
  );
}
