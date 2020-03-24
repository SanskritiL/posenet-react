import React, { useState, useEffect } from "react";
import * as ml5 from "ml5"; //import ml5

let brain;
let deta;

export default function KeyPress() {

  const loadPoseNet = () => {


   

    let options = {
      inputs: 34,
      outputs: 4,
      task: "classification",
      debug: false
    };
    brain = ml5.neuralNetwork(options);
    brain.loadData('data/ymca.json',dataReady)
  };
  // function onload(){

  //   fetch('data/ymca.json').then(res=> res.json()).then(data => console.log(data))
  //   const options = {
  //     //dataUrl: 'data/ymca.json',
  //     task: 'classification', // or 'regression'
  //     inputs: 34, // r, g, b
  //     outputs: 4// red-ish, blue-ish
  //   }
  //   nn = ml5.neuralNetwork(options,dataLoaded)
  
  // }
  function dataReady(){
    console.log("data readay")
    // nn.loadData('data/ymca.json')
  
     brain.normalizeData()
     trainModel()
  }
  function trainModel(){
    console.log("training model")
    const trainingOptions = {
      epochs: 32,
      batchSize: 12
    }
    brain.train(trainingOptions, finishedTraining);
  }
  function finishedTraining(){
     brain.save()
  }

 

  return(
    <button onClick={() => loadPoseNet()}>Load Data</button>
  )
}
