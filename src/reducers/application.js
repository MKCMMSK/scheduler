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