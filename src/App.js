import React from 'react';
import './App.css';
import CameraSetup from "./components/cameraSetup"
import PoseNetComponent from "./components/poseNet"
function App() {
   
  

  return (
    <div className="App">
      <h2>Welcome to Pose Detection</h2>
      <PoseNetComponent />
    </div>
  );
}

export default App;
