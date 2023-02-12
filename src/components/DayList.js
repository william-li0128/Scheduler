import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const days = props.days;

  const listDays = days.map((day) =>
    <ul key={day.id}>
      <DayListItem
        name={day.name}
        spots={day.spots}
        selected={day.name === props.value}
        setDay={props.onChange}
      />
    </ul>
  )

  return (
    <ul>{listDays}</ul>
  );
}