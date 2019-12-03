import React, { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  let [previousMode, setPreviousMode] = useState([initial]);
  let initialValue = initial;

  const transition = (value, replace = false) => {
    if (replace) {
      const newHistory = previousMode.slice(0, previousMode.length - 1);
      
      // previousMode.pop();
      setPreviousMode([...newHistory, value]);
      console.log(previousMode, "new previous mode");
    } else {
      setPreviousMode([...previousMode, value]);
    }
    setMode(value);
  }
  const back = () => {
    const newHistory = previousMode.slice(0, previousMode.length - 1);
    const prevMode = previousMode.slice(previousMode.length - 2)[0];
    setPreviousMode(newHistory);
    setMode(previousMode);

    // previousMode.pop();
    // if (previousMode.length === 0) {
    //   setMode(initialValue);
    // } else {
    //   setMode(previousMode[previousMode.length-1]);
    // }
    
  } 
  return { mode, transition, back };
}

