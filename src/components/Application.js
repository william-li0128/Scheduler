import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import getAppointmentsForDay from "helpers/selectors";

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {}
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  // create a function called setDay that updates the state with the new day.
  const setDay = day => setState({ ...state, day });

  const listAppointments = dailyAppointments.map(appointment =>
    appointment.interview ? 
      <Appointment 
        key={appointment.id}
        time={appointment.time} 
        interview={appointment.interview}
      /> : 
      <Appointment 
        key={appointment.id}
        time={appointment.time} 
      />
  )

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments')
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data }));
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
        {listAppointments}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
