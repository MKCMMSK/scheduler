import React, { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  let [previousMode] = useState([initial]);
  let initialValue = initial;
  const transition = (value, err) => {
    if (err !== true) {
      previousMode.push(value);
    }
    setMode(value);
  }
  const back = () => {
    previousMode.pop();

    if (previousMode.length === 0) {
      setMode(initialValue);
    } else {
      setMode(previousMode[previousMode.length-1]);
    }
  } 
  return { mode, transition, back };
}

