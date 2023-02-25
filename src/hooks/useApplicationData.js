import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  // create a function called setDay that updates the state with the new day.
  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    });
  }, []);

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const dayId = (id - (id % 5)) / 5;

    const day = {
      ...state.days[dayId],
      spots: state.days[dayId].spots - 1
    };

    let updatedDays = [...state.days];
    updatedDays[dayId] = day;
 
    return axios.put(`http://localhost:8001/api/appointments/${id}`, {interview: interview})
    .then ( 
      setState({
        ...state,
        appointments,
        days : updatedDays
      })
    )
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    const dayId = (id - (id % 5)) / 5;

    const day = {
      ...state.days[dayId],
      spots: state.days[dayId].spots + 1
    };

    let updatedDays = [...state.days];
    updatedDays[dayId] = day;

    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
    .then (
      setState({
        ...state,
        appointments,
        days : updatedDays
      })
    )
  }

  return { state, setDay, bookInterview, cancelInterview };
};