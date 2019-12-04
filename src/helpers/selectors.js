export function getAppointmentsForDay(state, day) {
  const result = [];
  console.log(state.days, "state.days in selectors")
  state.days.forEach(dayObj => {
    console.log(dayObj, " dayobj inside selectors");
    if(dayObj.name === day) {
      dayObj.appointments.map ((appointmentNo) => {
        result.push(state.appointments[appointmentNo])
      })
    }
  })
  return result;
}

export function getDayByAppointmentId(state, appointmentId) {
  let dayId;
  state.days.forEach(day => {
    day.appointments.forEach(id => {
      if (id === appointmentId) {
        dayId = day.id;
      }
    })
  });
  return dayId;
}

export function getInterview(state, interview) {
  let result = {};
  if (interview) {
    for (let int in state.interviewers) {
      if (interview.interviewer === state.interviewers[int].id) {
        result.student = interview.student;
        result.interviewer = state.interviewers[int];
        return result;
      }
    }
  }
  return null;
}

export function getInterviewersByDay(state, day) {
  const result = [];
 
  state.days.forEach(dayObj => {
    if(dayObj.name === day) {
      dayObj.interviewers.map ((id) => {
        result.push(state.interviewers[id])
      })
    }
  })
  return result;
}

