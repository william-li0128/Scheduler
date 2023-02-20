import React from "react";

import useVisualMode from "hooks/useVisualMode";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Status from "./Status";
import Form from "./Form";
import Confirm from "./Confirm";

import "components/Appointment/styles.scss"

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview).then(() => {transition(SHOW)});
  };

  function onDelete() {
    transition(CONFIRM);
  }

  function onConfirm() {
    transition(SAVING);
    props.cancelInterview(props.id).then(() => {transition(EMPTY)});
  }

  return (
    <article className="appointment">
      <Header
        time={props.time}
      />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => onDelete()}
        />
      )}
      {mode === SAVING && (
        <Status
          message="Saving"
        />
      )}
      {mode === CREATE && (
        <Form
        interviewers={props.interviewers}
        onSave={(name, interviewer) => save(name, interviewer)}
        onCancel={() => back()}
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you would like to delete?"
          id={props.id}
          onConfirm={onConfirm}
          onCancel={() => back()}
        />
      )}
    </article>
  );
}