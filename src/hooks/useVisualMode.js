import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  let [previousMode, setPreviousMode] = useState([initial]);

  const transition = (value, replace = false) => { //transitions to the desired view
    if (replace) {
      const newHistory = previousMode.slice(0, previousMode.length - 1);
      setPreviousMode([...newHistory, value]);
    } else {
      setPreviousMode([...previousMode, value]);
    }
    setMode(value);
  }
  const back = () => { //reverts mode back
    const newHistory = previousMode.slice(0, previousMode.length - 1);
    const prevMode = previousMode.slice(previousMode.length - 2)[0];
    setPreviousMode(newHistory);
    setMode(prevMode);
  } 
  return { mode, transition, back };
}

