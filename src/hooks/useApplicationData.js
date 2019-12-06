import axios from "axios";
import {useReducer,useEffect} from "react";

import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW,
  UPDATE_SPOTS
} from "reducers/application";

export default function useApplicationData() {
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";
  const UPDATE_SPOTS = "UPDATE_SPOTS";
  
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  
  

  function bookInterview(appointmentId, interview) {
   
    return axios.put(`/api/appointments/${appointmentId}`, { interview })
    .then(() => {
      
      dispatch({
        type: SET_INTERVIEW,
        appointmentId,
        interview
      });
      dispatch({
        type: UPDATE_SPOTS,
        appointmentId
      })
    });
  }

  function cancelInterview(appointmentId) {
    return axios.delete(`/api/appointments/${appointmentId}`).then(() => {
      dispatch({
        type: SET_INTERVIEW,
        appointmentId,
        interview: null,
      });
      dispatch({
        type: UPDATE_SPOTS,
        appointmentId
      });
  });
  }

  const setDay = day => dispatch({
    type: SET_DAY,
    day: day,
  });

  
  
  useEffect(()=>{
    Promise.all([
      Promise.resolve(axios.get("/api/days")),
      Promise.resolve(axios.get("/api/appointments")),
      Promise.resolve(axios.get("/api/interviewers"))
    ]).then((all) => {
      dispatch({ type: SET_APPLICATION_DATA, 
        days: all[0].data, 
        appointments: all[1].data, 
        interviewers: all[2].data,
      });
    })
  },[]);

  return { state, setDay, bookInterview, cancelInterview};
}
