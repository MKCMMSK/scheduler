import React, {useState} from 'react';
import "components/Appointment/styles.scss";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form (props) {
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [name, setName] = useState(props.name || "");
  const interviewerId = (interviewer || {}).id;
  const [denyText, setDenyText] = useState("");
  
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
            data-testid="student-name-input"
          />
          <section className="appointment__validation">{denyText}</section>

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
          <Button confirm onClick={() => {
            if (interviewer === null) {
              setDenyText("You haven't set an interviewer yet");
            } else if (name !== "") {
              props.onSave(name, interviewer.id)
              setDenyText("");
            } else {
              setDenyText("Student name cannot be blank");
            }
          }}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );

  function reset () { //resets name and interviewers
    setName("");
    setInterviewer(null);
  } 

  function cancel () { //on cancel, reset name and interviewers and invoke .conCancel()
    reset();
    props.onCancel();
  }
  
}