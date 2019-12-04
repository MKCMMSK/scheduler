import React, {useState} from 'react';
import "components/Appointment/styles.scss";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form (props) {
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [name, setName] = useState(props.name || "");
  const interviewerId = (interviewer || {}).id;
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--s  emi-bold"
            name="name"
            value={name}
            type="text"
            placeholder="Enter Student Name"
            onChange={(event) => setName(event.target.value)}
          />
        </form>
        <InterviewerList 
          interviewers={props.interviewers} 
          interviewerId={interviewerId} 
          onChange={setInterviewer} 
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button confirm onClick={() => props.onSave(name, interviewer.id)}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );



  function reset () {
    setName("");
    setInterviewer(null);
  } 

  function cancel() {
    reset();
    props.onCancel();
  }
  
}