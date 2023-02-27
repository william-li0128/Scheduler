export function getAppointmentsForDay(state, day) {
  let resultArray = []; // store result

  for (const dayObject of state.days) {
    if (day === dayObject.name) { // select all appointments at that day
      resultArray = dayObject.appointments.map(id => state.appointments[id]); 
    } // use appoinment id to selecte and combine all must-have data in an array
  }

  return resultArray;
}

export function getInterviewersForDay(state, day) {
  let resultArray = [];

  for (const dayObject of state.days) {
    if (day === dayObject.name) {
      resultArray = dayObject.interviewers.map(id => state.interviewers[id]);
    }
  }

  return resultArray;
}

export function getInterview(state, interview) {
  let interviewObject = null;
  
  if(interview) { // if interview data exists
    interviewObject = {};
    interviewObject.student = interview.student;
    interviewObject.interviewer = state.interviewers[interview.interviewer];
  } // chain an interviewer object inside another object

  return interviewObject;
}