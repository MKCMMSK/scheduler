import  React from "react";
import InterviewerListItem from 'components/InterviewerListItem.js';
import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  
  const interviewerListItem = props.interviewers.map((interviewer) => {
        return (
        <InterviewerListItem
          id={interviewer.id}
          name={interviewer.name} 
          selected={interviewer.id === props.interviewerId}
          avatar={interviewer.avatar}
          setInterviewer={event => props.onChange(interviewer)}
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
