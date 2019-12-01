import "components/Appointment/styles.scss";
import React from "react";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import useVisualMode from "hooks/useVisualMode";
import getInterviewersByDay from "helpers/selectors";

export default function Appointment (props){
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={()=> transition(CREATE)} />}

      {mode === SHOW && props.interview &&(
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && (
        <Form
        interviewers={props.interviewers}
        onCancel={back}
        onSave={save}
        
        />
      )}
      
    </article>
  )

  
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    console.log(name, interviewer, " this is inside save");
    props.bookInterview(props.id,interview)
    .then((res)=> transition(SHOW))
  }

}


