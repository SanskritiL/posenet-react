import React,{ useState, useRef }  from 'react';
import './App.css';
import SetWebcam from './components/Webcam'
import PoseNet from "./components/PoseNet"
import LoadPose from "./components/LoadPose"
function App() {
   
  const webcamRef = React.useRef(null)
 
  return (
    <div className="App">
      <h2>Welcome to Pose Detection</h2>
     
      <PoseNet webcamRef={webcamRef}/>
      <SetWebcam webcamRef={webcamRef}/>
      {/* <LoadPose /> */}
     
    </div>
  );
}

export default App;
