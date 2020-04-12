import React, { useRef } from "react";
import Webcam from "react-webcam";

export default function SetWebCam({ webcamRef }) {
  const videoConstraints = { width: 1080, height: 840 };

  return (
    //react webcam library
    
      <Webcam
        audio={false}
        height={440}
        ref={webcamRef}
        width={580}
        videoConstraints={videoConstraints}
      />
     
  );
}
