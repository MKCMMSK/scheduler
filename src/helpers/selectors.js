export function getAppointmentsForDay(state, day) {
  const result = [];
 
  state.days.forEach(dayObj => {
    if(dayObj.name === day) {
      dayObj.appointments.map ((appointmentNo) => {
        result.push(state.appointments[appointmentNo])
      })
    }
  })
  return result;
}


export function getInterview(state, interview) {
  const newObj = {};
  if (interview === null) {
    return null;
  } else {
    newObj.student = interview.student;
    newObj.interviewer = state.interviewers[interview.interviewer];
  }
  return newObj;
}


