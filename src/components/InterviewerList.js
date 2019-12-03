import  React from "react";
import InterviewerListItem from 'components/InterviewerListItem.js';
import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  console.log("colin", props);

  const interviewerListItem = props.interviewers.map((interviewer) => {
    console.log(props.value, "this is in list");
    console.log(interviewer, "form interviewer");
        return (
        <InterviewerListItem
          id={interviewer.id}
          name={interviewer.name} 
          selected={interviewer.id === props.value}
          avatar={interviewer.avatar}
          setInterviewer={event => props.onChange(interviewer.id)}
        />)
      }
    );
    
    return (
      <section className="interviewers__header">
        <ul className="interviewers__list">
          {interviewerListItem}
        </ul>
      </section>
    )
}
