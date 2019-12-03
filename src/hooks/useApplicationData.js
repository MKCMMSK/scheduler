import axios from "axios";
import {useState,useEffect} from "react";

export default function useApplicationData() {
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    setState({
      ...state,
      appointments
    });
    return axios.put(`/api/appointments/${id}`, { interview });
  }

  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`);
  }

  const setDay = day => setState({ ...state, day });

  
  
  useEffect(()=>{
    Promise.all([
      Promise.resolve(axios.get("/api/days")),
      Promise.resolve(axios.get("/api/appointments")),
      Promise.resolve(axios.get("api/interviewers"))
    ]).then((all) => {
      setState(prev => ({ days: JSON.parse(all[0].request.response), appointments: JSON.parse(all[1].request.response), interviewers: JSON.parse(all[2].request.response) }))
    })
  },[]);

  return { state, setDay, bookInterview, cancelInterview};
}