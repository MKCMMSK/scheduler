import {getDayByAppointmentId, getAppointmentsForDay} from "helpers/selectors";


const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";
const UPDATE_SPOTS = "UPDATE_SPOTS";

export {SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW,UPDATE_SPOTS}
export function reducer(state, action){ //reducer

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
    default:{
      throw new Error("tried to reduce with unsupported action type");
    }
  }

}
