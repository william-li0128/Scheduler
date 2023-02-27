import { useState, useEffect } from "react";
import axios from "axios";


export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });



  //This function will set the day inside the useState above
  const setDay = day => {
    return setState({ ...state, day })
  };

  useEffect(()=>{
    const dayURL = "/api/days";
    const appointmentURL = "/api/appointments";
    const interviewersURL = "/api/interviewers";
    Promise.all([
      axios.get(dayURL),
      axios.get(appointmentURL),
      axios.get(interviewersURL)
    ]).then((all) =>{
      setState(prev=>({...prev, days:all[0].data, appointments:all[1].data, interviewers:all[2].data}));
    })
  },[]);

  //find the day
  function findDay(day) {
    const daysOfWeek = {
      Monday: 0,
      Tuesday: 1,
      Wednesday: 2,
      Thursday: 3,
      Friday: 4
    }
    return daysOfWeek[day]
  }


    //function to book an interview
    function bookInterview(id, interview) {
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };
  
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };

      const dayOfWeek = findDay(state.day)
      let day = {
        ...state.days[dayOfWeek],
        spots: state.days[dayOfWeek]
      }
  
      if (!state.appointments[id].interview) { 
        // which means to create a new appointment
        day = {
          ...state.days[dayOfWeek],
          spots: state.days[dayOfWeek].spots - 1
          /* since a new spot has been booked,
          takes down one available spot.    */
        } 
      } else { // which to edit an existing appointment
        day = {
          ...state.days[dayOfWeek],
          spots: state.days[dayOfWeek].spots
          /* since the spot has been already booked,
          available spots won't change.          */
        } 
      }
  
      let days = state.days
      days[dayOfWeek] = day;
  
  
      const url =`/api/appointments/${id}`;
      return axios.put(url, appointment).then(() => {
        setState({...state, appointments,days});
      })
    }


      //function to cancel the interview
  function cancelInterview(id){
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const dayOfWeek = findDay(state.day)

    const day = {
      ...state.days[dayOfWeek],
      spots: state.days[dayOfWeek].spots + 1
      /* since an existing spot has been deleted,
      increases available spots by 1.          */
    }          


    let days = state.days
    days[dayOfWeek] = day;

    const url =`/api/appointments/${id}`;
  
    return axios.delete(url, appointment).then(()=>{
      setState({...state, appointments, days });
    });
  }

  return {
    state, 
    setDay,
    bookInterview,
    cancelInterview
  }

}