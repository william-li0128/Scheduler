export function getAppointmentsForDay(state, day) {
  let resultArray = [];

  for (const dayObject of state.days) {
    if (day === dayObject.name) {
      resultArray = dayObject.appointments.map(id => state.appointments[id]);
    }
  }

  return resultArray;
}

export function getInterview(state, interview) {
  let interviewObject = null;
  
  if(interview) {
    interviewObject = {};
    interviewObject.student = interview.student;
    interviewObject.interviewer = state.interviewers[interview.interviewer];
  }

  return interviewObject;
}