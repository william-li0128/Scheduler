import React from "react";

import useVisualMode from "hooks/useVisualMode";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Status from "./Status";
import Form from "./Form";
import Confirm from "./Confirm";
import Error from "./Error";

import "components/Appointment/styles.scss"

export default function Appointment(props) {

  // Declare states here
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const DELETING = "DELETING";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING); // show saving state when handeling PUT request

    props
      .bookInterview(props.id, interview) // PUT request
      .then(() => transition(SHOW)) // transit to SHOW state with successful request
      .catch(error => transition(ERROR_SAVE, true)) // transit to ERROR_SAVE state with error
  }; //  save function to add interview data into API server

  function destroy(event) {
    transition(DELETING, true);

    props
      .cancelInterview(props.id) // delete request
      .then(() => transition(EMPTY)) // transit to EMPTY state with successful request
      .catch(error => transition(ERROR_DELETE, true)) // transit to ERROR_DELETE state with error
  }; // destroy function to cancel the interview

  return (
    <article className="appointment" data-testid="appointment">
      <Header
        time={props.time}
      />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)} /* confirm before delete */
        />
      )}
      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => back()} /* back to SHOW state */
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
        />
      )}
      {mode === SAVING && (
        <Status
          message="Saving"
        />
      )}
      {mode === DELETING && (
        <Status
          message="Deleting"
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => back()}
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you would like to delete?"
          id={props.id}
          onConfirm={destroy} /* delete with confirmation */
          onCancel={() => back()} /* back to SHOW state */
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
          message="could not save appointment."
          onClose={() => back()} /* back to SHOW state */
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message="could not cancel appointment."
          onClose={() => back()} /* back to SHOW state */
        />
      )}
    </article>
  );
}