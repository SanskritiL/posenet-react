import React from "react";
import sketch from "./Sketch";
import P5Wrapper from "react-p5-wrapper";

export default function P5({ poses }) {
  //console.log("p5 ko pose", pose)

  return (
    <div>
      <h3>p5 loaded</h3>
      <P5Wrapper sketch= {sketch} poses={poses} />
    </div>
  );
}
