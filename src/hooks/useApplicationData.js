import axios from "axios";
import {useReducer,useEffect} from "react";
import {getDayByAppointmentId, getAppointmentsForDay} from "helpers/selectors";



export default function useApplicationData() {
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";
  const UPDATE_SPOTS = "UPDATE_SPOTS";
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
          [action.appointmentId]: {
            ...state.appointments[action.appointmentId],
            interview: action.interview === null ? null : { ...action.interview }
          },
        };
        
        return {
          ...state,
          appointments,
        };
      }
      case UPDATE_SPOTS:{

        const dayId = getDayByAppointmentId(state, action.appointmentId);
        const spots = getAppointmentsForDay(state, state.day);

        const day = {
          ...state.days[dayId],
          spots: spots.filter((item)=> item.interview === null).length
        }
        const days = state.days.map((dayObj, index) => {
          if (index === (day.id -1)) {
            return day;
          }
          return dayObj;
        });

        return ({
          ...state,
          days
        });

      }
      
      default:
        return state;
    }
  }
  

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
