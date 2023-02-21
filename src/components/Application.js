import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import {getAppointmentsForDay, getInterviewersForDay, getInterview} from "helpers/selectors";

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const appointments = getAppointmentsForDay(state, state.day);

  // create a function called setDay that updates the state with the new day.
  const setDay = day => setState({ ...state, day });

  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    const interviewers = getInterviewersForDay(state, state.day);
    
    function bookInterview(id, interview) {
      const bookAppointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };

      const bookAppointments = {
        ...state.appointments,
        [id]: bookAppointment
      };
      
      return axios.put(`http://localhost:8001/api/appointments/${id}`, {interview: interview})
      .then ( 
        setState({
          ...state,
          bookAppointments
        })   
      )
    }

    function cancelInterview(id) {
      const cancelAppointment = {
        ...state.appointments[id],
        interview: null
      };

      const cancelAppointments = {
        ...state.appointments,
        [id]: cancelAppointment
      }

      return axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then (
        setState({
          ...state,
          cancelAppointments
        })
      )
    }

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );

  });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    });
  }, []);

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
            value={state.day} 
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
}
