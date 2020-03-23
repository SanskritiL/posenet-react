import React, { useState, useEffect } from "react";

export default function KeyPress() {
  // Call our hook for each key that we'd like to monitor
  const happyPress = useKeyPress("a");
  const sadPress = useKeyPress("s");
  const robotPress = useKeyPress("c");
  const foxPress = useKeyPress("m");
  const yellowPress = useKeyPress("y");
  
  return (
    <div>
      <div>a, s, c, m, y</div>
      
      <div>
        {happyPress && "😊 Aclicked"}
        {sadPress && "😢 S clicked"}
        {robotPress && "🤖 C clicked"}
        {foxPress && "🦊 M clicked"}
        {yellowPress && "✊Y clicked"}
      </div>
    </div>
  );
  }

function useKeyPress(targetKey) {
  const [keyPressed, setKeyPressed] = useState(false);

  //if pressed key is our target key then set true
  function downHandler({ key }) {
    if (key === targetKey) {
      setKeyPressed(true);
      
    }
  }
  // If released key is our target key then set to false
  const upHandler = ({ key }) => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };

  // Add event listeners
  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
     // window.removeEventListener("keyup", upHandler);
    };

  }, [keyPressed]); // Empty array ensures that effect is only run on mount and unmount
  
  return keyPressed;
}
