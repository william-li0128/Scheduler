import {useState} from "react";

export default function useVisualMode(initial){
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]); 


  //transition function
  function transition(nextMode, replace = false) {
    setMode(nextMode);
    if(replace){
      setHistory(prev => prev.slice(0, -1));
      setHistory(prev => [...prev, nextMode]);
    } else {
      setHistory(prev => [...prev, nextMode]); 
    }

  }

  //back function
  function back() {
    if(history.length > 1) {
      setHistory(history.slice(0, -1));
      setMode(history[history.length-2]);
    }
  }

  return { mode, transition, back};
}