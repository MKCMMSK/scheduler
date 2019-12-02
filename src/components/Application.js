import React, { useState, useEffect} from "react";
import axios from 'axios'
import "components/Application.scss";
import DayList from "components/DayList.js";
import Appointment from "components/Appointment/index";
import { getAppointmentsForDay, getInterview, getInterviewersByDay } from "../helpers/selectors";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";

export default function Application(props) {
 
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });


  const setDay = day => setState({ ...state, day });
  
  useEffect(()=>{
    Promise.all([
      Promise.resolve(axios.get("/api/days")),
      Promise.resolve(axios.get("/api/appointments")),
      Promise.resolve(axios.get("api/interviewers"))
    ]).then((all) => {
      setState(prev => ({ days: JSON.parse(all[0].request.response), appointments: JSON.parse(all[1].request.response), interviewers: JSON.parse(all[2].request.response) }))
    })},[]);

  const appointments = getAppointmentsForDay(state, state.day);
  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    const interviewers = getInterviewersByDay(state, state.day);
    {return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        onDelete={cancelInterview}
      />
    )}
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );

  
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
    // const nullAppointment = {
    //   ...state.appointments[id],
    //   interview: { ...state.appointments[id].interview }
    // };

    // const appointments = {
    //   ...state.appointments,
    //   [id]: nullAppointment
    // };
    
    return axios.delete(`/api/appointments/${id}`);
  }

}
