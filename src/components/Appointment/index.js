import "components/Appointment/styles.scss";
import React from "react";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import useVisualMode from "hooks/useVisualMode";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";

export default function Appointment (props){
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETE = "DELETE";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";


  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  const deleting = (id) => {
    transition(DELETE);
    props.onDelete(id)
    .then(()=> transition(EMPTY))
    .catch(() => transition(ERROR_DELETE, true));
  }

  function save (name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);
    
    props.bookInterview(props.id,interview)
    .then((res)=> transition(SHOW))
    .catch((error) => {
      transition(ERROR_SAVE, true);
    })
  }
  
  return (
    
    <article 
      className="appointment"
      data-testid="appointment" 
    >
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={()=> transition(CREATE)} />}

      {mode === SHOW && props.interview &&(
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {mode === CREATE && (
        <Form
        interviewers={props.interviewers}
        onCancel={back}
        onSave={save}
        
        />
      )}
      {mode === SAVING && (
        <Status message="Saving"/>
      )}
      {mode === CONFIRM && (
        <Confirm 
        message = "Are you sure you want to cancel the interview?"
        onCancel = {() => back()}
        onConfirm = {() => deleting(props.id)}
        />
      )}
      {mode === DELETE &&(
        <Status message="Deleting"/>
        
      )}
    
      {mode === EDIT &&(
        <Form
        name = {props.interview.student}
        interviewer = {props.interview.interviewer}
        interviewers = {props.interviewers}
        onCancel= {() => transition(SHOW)}
        onSave = {save}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
        message = "Error saving the appointment"
        onClose = {back}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
        message = "Error deleting the appointment"
        onClose ={back}
        />
      )}
      
    </article>
  )

  

}


