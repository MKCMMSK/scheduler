import axios from "axios";
import {useReducer,useEffect} from "react";
import {getDaybyAppointmentId, getDayByAppointmentId} from "helpers/selectors";
export default function useApplicationData() {
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";
  // const getSpotsFromDays = (day) => {
  //   const spotsTaken = day.appointments;
  //   let spotsFree = 0;
  //   spotsTaken.map(appointment => {
  //     if (appointment.interview === null) {
  //       spotsFree ++;
  //     }
  //   })
  //   return spotsFree;
  // }

  // const setSpotsState = (days) => {
  //     const update = days.map(day => ({
  //       ...day,
  //       spots: getSpotsFromDays(day)
  //     }));
  //     return update;
  // }
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
    spots: 5
  });

  function reducer(state, action){
    switch (action.type) {
      case SET_DAY:{
        return {
          ...state, 
          day: action.day,
        }
      }
      case SET_APPLICATION_DATA:{
        return {
          ...state,
          days: action.days,
          appointments: action.appointments,
          interviewers: action.interviewers
        };
      }
      case SET_INTERVIEW:{

        const appointments = {
          ...state.appointments,
          [action.id]: {
            ...state.appointments[action.id],
            interview: action.interview === null ? null : { ...action.interview }
          },
        };
        const dayId = getDayByAppointmentId(state, action.id);
        const day = {
          ...state.days[dayId],
          spots: action.spots
        }

        const days = state.days.map((dayObj, index) => {
          if (index === (day.id -1)) {
            return day;
          }
          return dayObj;
        });

        return {
          ...state,
          appointments,
          days
        };
      }
      default:
        return state;
    }
  }
  

  function bookInterview(id, interview) {
   
    return axios.put(`/api/appointments/${id}`, { interview })
    .then(() => {dispatch({
      type: SET_INTERVIEW,
      id,
      interview,
      spots
    })});
  }

  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`).then(() => {dispatch({
      type: SET_INTERVIEW,
      id,
      interview: null,
      spots
    })});
  }

  const setDay = day => dispatch({
    type: SET_DAY,
    day: day,
  });

  
  
  useEffect(()=>{
    Promise.all([
      Promise.resolve(axios.get("/api/days")),
      Promise.resolve(axios.get("/api/appointments")),
      Promise.resolve(axios.get("api/interviewers"))
    ]).then((all) => {
      dispatch({ type: SET_APPLICATION_DATA, 
        days: all[0].data, 
        appointments: all[1].data, 
        interviewers: all[2].data,
      });
      console.log(all[1].data)
    })
  },[]);

  return { state, setDay, bookInterview, cancelInterview};
}
