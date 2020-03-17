import React, {useRef,useEffect} from "react"
import PoseNetComponent from "./poseNet"

function CameraSetup(){

    const videoRef = useRef(null) //acess video element 
    //setting up webcam after component mounts
    useEffect(() => {
      navigator.mediaDevices.getUserMedia({
        audio: false,
        video:{ width: 1280, height: 720 }
        
      })
      .then(stream => {
            videoRef.current.srcObject = stream
      }).catch(console.error)
    },[])

  return(
      <div>
        <video ref={videoRef} autoPlay>Video Stream not available</video>
        <PoseNetComponent />
    </div>
  )

}

export default CameraSetup