import React,{useRef} from "react"
import Webcam from "react-webcam"


export default function SetWebCam({webcamRef}){


    const videoConstraints={width:680, height:540}
    
    
    return(
        //react webcam library
        <Webcam 
          audio={false}
          height={540}
          ref={webcamRef}
          width={680}
          videoConstraints={videoConstraints}
        />
    )
    
}