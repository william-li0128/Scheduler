export default function getAppointmentsForDay(state, day) {
  let resultArray = [];

  for (const dayObject of state.days) {
    if (day === dayObject.name) {
      resultArray = dayObject.appointments.map(id => state.appointments[id]);
    }
  }

  return resultArray;
}